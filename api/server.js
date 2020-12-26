require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const initalizePassport = require("./passport-config");
const userModel = require("./models/Users");
const roomModel = require("./models/Rooms");
const facultyModel = require("./models/Faculties");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 8080;

/**
 * Google OAuth config
 */
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

/**
 * nodemailer config
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken,
  },
});

/**
 * Cloudinary Config
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Profile Images
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[
      file.originalname.split(".").length - 1
    ];
    const imageFileName = `${uuidv4()}`;
    cb(null, imageFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter,
});

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection: error: "));
db.once("open", () => {
  console.log("E-University Database connected!");
});

initalizePassport(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

io.on("connection", (socket) => {
  console.log("Socket user Connected");

  socket.on("create", (roomId) => {
    socket.join(roomId);
  });

  socket.on("test", () => {
    console.log("Testing");
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return;
};
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
};

/**
 * data entry to add users data to the database
 */
app.post("/api/createUser", checkAuthenticated, async (req, res) => {
  if (req.user.isAdmin) {
    const {
      firstname,
      lastname,
      nationalID,
      faculty,
      level,
      department,
      isProf,
    } = req.body.data;

    if (await userModel.findOne({ nationalID })) {
      return res.send({ status: 404, message: "user already registered !" });
    }

    const user = new userModel({
      firstname,
      lastname,
      faculty,
      nationalID,
      level,
      department,
      isProf,
    });
    await user.save();

    return res.send({ status: 200, message: "user stored!" });
  }

  return;
});

/**
 * user sign up with national id
 */
app.post("/api/registerUser", (req, res) => {
  const { nationalID } = req.body.data;

  userModel.findOne({ nationalID }, (err, user) => {
    if (user && !user.email) {
      return res.send({ status: 200, continue: true });
    } else {
      const reason = user ? "email" : "no user";
      return res.send({ status: 404, continue: false, reason });
    }
  });
});

/**
 * if the national id is correct then proceed the register with more data inputs
 */
app.post("/api/continueRegister", (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    street,
    city,
    phoneNumber,
    nationalID,
  } = req.body.data;

  if (password !== confirmPassword) {
    return res.send({ status: 404, pass: false });
  }

  userModel.findOne({ nationalID }, async (err, user) => {
    if (!err && !user.email) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.email = email;
      user.password = hashedPassword;
      user.street = street;
      user.city = city;
      user.phoneNumber = phoneNumber;
      user.save();
      return res.send({ status: 200, pass: true });
    } else {
      const reason = user.email ? "email" : "no user";
      return res.send({ status: 404, pass: false, reason });
    }
  });
});

/**
 * Login user with meail and password
 */
app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/failure",
  })
);

/**
 * If user login is successfull
 */
app.get("/api/success", (req, res) => {
  res.send({ status: 200, pass: true });
});

/**
 * If user login is unsesuccessfull
 */
app.get("/api/failure", (req, res) => {
  res.send({ status: 200, pass: false });
});

/**
 * Forgot Password token Request
 */
app.post("/api/auth/forgotpassword", checkNotAuthenticated, (req, res) => {
  if (!req.body.data.email) return;

  userModel.findOne({ email: req.body.data.email }, (err, user) => {
    if (user) {
      // added reset password token and expiry time
      user.resetPasswordToken = uuidv4();
      user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

      user.save().then((savedUser) => {
        const link = `http://localhost:3000/auth/reset/${savedUser.resetPasswordToken}`;

        // send reset token password link
        const mailOptions = {
          from: process.env.EMAIL,
          to: savedUser.email,
          subject: "E-University: Password change request",
          html: `<div><h2>Hi ${savedUser.firstname} ${savedUser.lastname}</h2><br><p>Please click on the following button to reset your password this button will expire after 1 hour.</p><button><a style="text-decoration:none;" href='${link}' >Click Here</a></button><p>If you did not request this, please ignore this email and your password will remain unchanged.</p></div>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.send({ pass: false });
          return res.send({ pass: true });
        });
      });
    } else {
      return res.send({ pass: false });
    }
  });
});

/**
 * After user changed his password using the token
 */
app.post("/api/auth/reset/:resetToken", checkNotAuthenticated, (req, res) => {
  const { password, confirmPassword } = req.body.data;

  if (password !== confirmPassword) {
    return;
  }

  userModel.findOne(
    {
      resetPasswordToken: req.params.resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    },
    async (err, user) => {
      if (!user) return res.send({ pass: false });

      // set new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      // save new password
      user.save((err) => {
        if (err) res.send({ pass: false });

        // send confirmation mail
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "E-University: Your Password has been changed",
          html: `<div><h2>Hi ${user.firstname} ${user.lastname}</h2><p>This is a confirmation that the password for your account has just been changed</p></div>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.send({ pass: false });

          return res.send({ pass: true });
        });
      });
    }
  );
});

/**
 * Get logged in user data
 */
app.get("/api/user", (req, res) => {
  let user;
  if (req.user) {
    const {
      firstname,
      lastname,
      email,
      street,
      city,
      phoneNumber,
      picture,
      department,
      isActive,
      isAdmin,
      isProf,
      faculty,
      level,
    } = req.user;
    user = {
      firstname,
      lastname,
      email,
      street,
      city,
      phoneNumber,
      picture,
      department,
      isActive,
      isAdmin,
      isProf,
      faculty,
      level,
    };
  }

  if (user) {
    return res.send({ pass: true, user });
  } else {
    return res.send({ pass: false });
  }
});

/**
 * Logout user
 */
app.get("/api/logout", (req, res) => {
  req.logout();

  res.send({ status: 200, pass: true });
});

/**
 * Update User's Profile Image
 */
app.post(
  "/api/updateImage",
  upload.single("myFile"),
  checkAuthenticated,
  (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "e-university-profile-pictures",
        use_filename: true,
      },
      (err, result) => {
        if (!err) {
          userModel
            .findOneAndUpdate(
              { email: req.user.email },
              { $set: { picture: result.public_id } }
            )
            .exec((err, user) => {
              if (!err) {
                user.picture !==
                  "e-university-profile-pictures/default-image_qtdxwi" &&
                  cloudinary.uploader.destroy(
                    user.picture.split(".")[0],
                    (err, result) => err && console.log(err)
                  );
                roomModel
                  .find({
                    participants: {
                      $all: [
                        {
                          $elemMatch: {
                            email: req.user.email,
                          },
                        },
                      ],
                    },
                  })
                  .exec(async (err, rooms) => {
                    if (rooms.length !== 0) {
                      for (const room of rooms) {
                        for (const i in room.participants) {
                          if (room.participants[i].email === req.user.email) {
                            room.participants[i] = {
                              ...room.participants[i],
                              picture: result.public_id,
                            };
                          }
                        }
                        await room.markModified("participants");
                        await room.save();
                      }
                    }
                    return res.send({ result: result.public_id, pass: true });
                  });
              }
            });
        }
      }
    );
  }
);

/**
 * Update user's Profile details
 */
app.post("/api/updateProfile", checkAuthenticated, (req, res) => {
  const { street, city, phoneNumber } = req.body.data;

  userModel.findOneAndUpdate(
    { email: req.user.email },
    { street, city, phoneNumber },
    (err, user) => {
      if (user) {
        return res.send({ pass: true });
      }
      return;
    }
  );
});

/**
 * Change user's password
 */
app.post("/api/auth/changePassword", checkAuthenticated, (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body.data;

  if (newPassword !== confirmPassword) return;

  userModel.findOne({ email: req.user.email }, async (err, user) => {
    if (!user) return;

    if (await bcrypt.compare(currentPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.save();

      return res.send({ pass: true });
    }
    return res.send({ pass: false });
  });
});

/**
 *  Change Email
 */
app.post("/api/auth/changeEmail", checkAuthenticated, (req, res) => {
  const { email } = req.body.data;

  if (!email) return;

  userModel.findOne({ email: req.user.email }, (err, user) => {
    if (!user) return;

    user.email = email;
    user.save();
    return res.send({ pass: true });
  });
});

/**
 * Get the users details other than the room itself
 */
app.get("/api/contacts", checkAuthenticated, (req, res) => {
  if (!req.user) {
    return;
  }
  roomModel
    .find(
      {
        participants: {
          $all: [
            {
              $elemMatch: {
                email: req.user.email,
              },
            },
          ],
        },
      },
      "participants"
    )
    .exec(async (err, rooms) => {
      const users = [];
      for (const room of rooms) {
        for (const participant of room.participants) {
          if (participant.email !== req.user.email) {
            const {
              firstname,
              lastname,
              email,
              city,
              phoneNumber,
              picture,
              department,
              isActive,
              faculty,
              level,
              isProf,
            } = await userModel.findOne({ email: participant.email }).exec();
            const displayname = `${firstname} ${lastname}`;
            users.push({
              displayname,
              email,
              city,
              phoneNumber,
              picture,
              department,
              isActive,
              faculty,
              level,
              isProf,
            });
          }
        }
      }
      return res.json(users);
    });
});

/**
 * Get the List of all the professors that are from the same faculty as the user
 */
app.get("/api/professors", checkAuthenticated, (req, res) => {
  userModel.find({ isProf: true, faculty: req.user.faculty }, (err, doc) => {
    if (doc) {
      const professors = [];
      let professor;

      for (const prof of doc) {
        if (prof.email) {
          const {
            firstname,
            lastname,
            email,
            city,
            phoneNumber,
            isActive,
            picture,
            department,
            faculty,
            level,
          } = prof;
          const displayname = `${firstname} ${lastname}`;
          professor = {
            displayname,
            email,
            city,
            phoneNumber,
            isActive,
            picture,
            department,
            faculty,
            level,
          };

          professors.push(professor);
        }
      }

      return res.send({ professors, pass: true });
    }
    return res.send({ pass: false });
  });
});

/**
 * get the user that is searched for
 */
app.get("/api/chat/search", checkAuthenticated, (req, res) => {
  // will change this with exact value soon
  //const cond = req.query.username.length !== 0 ? {$regex: '^' + req.query.username, $options: 'i'} : null;
  userModel.findOne({ email: req.query.email }).exec((err, user) => {
    let userRes;
    if (user) {
      const {
        firstname,
        lastname,
        email,
        city,
        phoneNumber,
        isActive,
        picture,
        department,
        faculty,
        level,
        isProf,
      } = user;
      const displayname = `${firstname} ${lastname}`;
      userRes = {
        displayname,
        email,
        city,
        phoneNumber,
        isActive,
        picture,
        department,
        faculty,
        level,
        isProf,
      };
      return res.send({ user: userRes, pass: true });
    }

    return res.send({ pass: false });
  });
});

/**
 * search for the room by participants and if it exists it opens the room and if it doesnt exists it creates a new room then opens it
 */
app.post("/api/chat/room", checkAuthenticated, (req, res) => {
  if (!req.user && !req.body.email) {
    return;
  }

  roomModel.findOne(
    {
      participants: {
        $all: [
          {
            $elemMatch: {
              email: req.user.email,
            },
          },
          {
            $elemMatch: {
              email: req.body.email,
            },
          },
        ],
      },
    },
    (err, room) => {
      if (err) {
        res.send(err);
      }

      if (!room) {
        const createdAt = new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        userModel.findOne({ email: req.body.email }).exec((err, otherUser) => {
          roomModel.create(
            {
              participants: [
                {
                  email: req.user.email,
                  displayname: `${req.user.firstname} ${req.user.lastname}`,
                  picture: req.user.picture,
                  isActive: req.user.isActive,
                  isProf: req.user.isProf,
                },
                {
                  email: otherUser.email,
                  displayname: `${otherUser.firstname} ${otherUser.lastname}`,
                  picture: otherUser.picture,
                  isActive: otherUser.isActive,
                  isProf: otherUser.isProf,
                },
              ],
              createdAt,
            },
            (err, createdRoom) => {
              res.json({ room: createdRoom });
            }
          );
        });
      } else {
        res.json({ room });
      }
    }
  );
});

// get message from client to save it to the database then sends it to other people particiating in this room chat
app.post("/api/sendMessage", checkAuthenticated, (req, res) => {
  const { firstname, lastname, email } = req.user;
  const displayname = `${firstname} ${lastname}`;
  if (req.body.message.trim() !== "") {
    roomModel.findOneAndUpdate(
      { _id: req.body.roomId },
      {
        $push: {
          messages: {
            from: { displayname, email },
            message: req.body.message.trim(),
          },
        },
      },
      { new: true },
      (err, doc) => {
        if (!err) {
          io.to(req.body.roomId).emit("message", {
            displayname,
            email,
            message: req.body.message,
            messageId: doc.messages.slice(-1)[0]._id,
          });
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/createFaculty", async (req, res) => {
  const { data } = req.body;

  const faculty = new facultyModel({ ...data });

  await faculty.save((err, result) => {
    if (err) return res.send({ pass: false });

    return res.send({ pass: true });
  });
});

/**
 * Get list of faculties name
 */
app.get("/api/getFacultiesNames", (req, res) => {
  facultyModel.find({}, "name departments", (err, faculties) => {
    if (err) return res.send({ pass: false });

    return res.send({ pass: true, faculties });
  });
});

/**
 * Get number levels of the selected Faculties
 */
app.get("/api/getFacultyLevels/:facultyName", (req, res) => {
  facultyModel.findOne(
    { name: req.params.facultyName },
    "levels",
    (err, faculty) => {
      if (err) return res.send({ pass: false });

      const levelsNumber = faculty.levels.length;
      return res.send({ pass: true, levelsNumber });
    }
  );
});

/**
 * Checks if the selected level of the selected Faculty has departments or not and if it has then returns the list of the departments
 */
app.get(
  "/api/checkLevelHasDepartment/:selectedFaculty/:selectedLevel",
  (req, res) => {
    const { selectedFaculty, selectedLevel } = req.params;
    facultyModel.findOne({ name: selectedFaculty }, (err, faculty) => {
      if (err) return res.send({ pass: false });

      const departments = faculty.levels[selectedLevel - 1].hasDepartments
        ? faculty.departments
        : [];

      return res.send({ pass: true, departments });
    });
  }
);

/**
 * Get the faculty that the user is enrolled in
 */
app.get("/api/getUserFaculty", checkAuthenticated, (req, res) => {
  facultyModel.findOne({ name: req.user.faculty }, (err, doc) => {
    if (err) return res.send({ pass: false });

    const { name, currentTerm, creditHours } = doc;

    const level = doc.levels[req.user.level - 1];
    const faculty = {
      name,
      currentTerm,
      creditHours,
      level,
      department: req.user.department,
    };

    return res.send({ pass: true, faculty });
  });
});

/**
 *  Get all Faculties in an array to be shown in a list
 */
app.get("/api/allFaculties", (req, res) => {
  facultyModel.find({}, "name", (err, faculties) => {
    if (err) return res.send({ pass: false });

    return res.send({ pass: true, faculties });
  });
});

/**
 * Get selected faculty to be edited
 */
app.post("/api/facultyToBeEdited", checkAuthenticated, (req, res) => {
  facultyModel.findOne({ _id: req.body.id }, (err, faculty) => {
    if (err) return res.send({ pass: false });

    userModel.find(
      { isProf: true, faculty: faculty.name },
      "firstname lastname",
      (err, professors) => {
        if (err) return res.send({ pass: false });

        const copyFaculty = { ...faculty._doc };
        copyFaculty.professors = professors;
        return res.send({ pass: true, faculty: copyFaculty });
      }
    );
  });
});

/**
 * Edit Faculty
 */
app.post("/api/editFaculty", checkAuthenticated, (req, res) => {
  const { data, id } = req.body;

  facultyModel.findOneAndUpdate({ _id: id }, { ...data }, (err, faculty) => {
    if (err) return res.send({ pass: false });

    if (faculty.name !== data.name) {
      userModel.updateMany(
        { faculty: faculty.name },
        { faculty: data.name },
        (err, users) => {
          if (err) return res.send({ pass: false });

          return res.send({ pass: true });
        }
      );
    } else {
      return res.send({ pass: true });
    }
  });
});

/**
 * Get Subjects that the professor is teaching only
 */
app.get("/api/professorSubjects", checkAuthenticated, (req, res) => {
  const { _id } = req.user;
  facultyModel.findOne(
    { "levels.subjects.professor._id": req.user._id.toString() },
    (err, faculty) => {
      let subjects = [];
      let pushObject = {};

      for (let index in faculty.levels) {
        pushObject.subjects = faculty.levels[index].subjects.filter(
          (subject) => subject.professor._id === _id.toString()
        );

        if (pushObject.subjects.length !== 0) {
          pushObject.level = parseInt(index) + 1;
          subjects.push(pushObject);
          pushObject = {};
        }
      }

      return res.send({ subjects });
    }
  );
});

/**
 * Get Subject that the professor selected
 */
app.post("/api/professor/get-subject", checkAuthenticated, (req, res) => {
  const { subjectId, level: frontLevel } = req.body;

  facultyModel.findOne({ name: req.user.faculty }, (err, faculty) => {
    if (err) return res.send({ pass: false });
    const docLevel = faculty.levels.find(
      (level, index) => index === frontLevel - 1
    );

    const docSubject = docLevel.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );

    return res.send({ pass: true, subject: docSubject });
  });
});

/**
 * Create lecture for the current subject in the specific level
 */
app.post("/api/professor/create-lecture", checkAuthenticated, (req, res) => {
  const { newLecture, level: frontLevel, subject: frontSubject } = req.body;

  facultyModel.findOne({ name: req.user.faculty }, (err, faculty) => {
    if (err) return res.send({ pass: false });
    const docLevel = faculty.levels.find(
      (level, index) => index === frontLevel - 1
    );

    const docSubject = docLevel.subjects.find(
      (subject) => subject.name === frontSubject.name
    );

    if (
      docSubject.lectures.find(
        (lecture) => lecture.lectureNumber === newLecture
      )
    )
      return res.send({ pass: false });

    docSubject.lectures.push({
      lectureNumber: newLecture,
      materials: [],
    });

    faculty.save();

    return res.send({ pass: true, subject: docSubject });
  });
});

/**
 * Create lecture for the current subject in the specific level
 */
app.post("/api/professor/delete-lecture", checkAuthenticated, (req, res) => {
  const { deleteLecture, level: frontLevel, subject: frontSubject } = req.body;

  facultyModel.findOne({ name: req.user.faculty }, (err, faculty) => {
    if (err) return res.send({ pass: false });
    const docLevel = faculty.levels.find(
      (level, index) => index === frontLevel - 1
    );

    const docSubject = docLevel.subjects.find(
      (subject) => subject.name === frontSubject.name
    );

    const lectureIndex = docSubject.lectures.findIndex(
      (lecture) => lecture.lectureNumber === deleteLecture
    );

    docSubject.lectures.splice(lectureIndex, 1);

    faculty.save();

    return res.send({ pass: true, subject: docSubject });
  });
});

const videoOrFileUpload = (req, res, frontLevel, subjectId, frontLecture, newMaterial, result = null) => {
  facultyModel.find({ faculty: req.user.faculty }, (err, faculty) => {
    if (err) return res.send({ pass: false });
    
    const docLevel = faculty.levels.find(
      (level, index) => index === frontLevel - 1
    );

    const docSubject = docLevel.subjects.find(
      (subject) => subject._id.toString() === subjectId
    );

    const docLecture = docSubject.lectures.find(
      (lecture) => lecture._id.toString() === frontLecture._id
    );

    docLecture.materials.push(
      newMaterial.type === "video"
        ? {
            type: newMaterial.type,
            name: newMaterial.name,
            link: newMaterial.link,
          }
        : {
            type: newMaterial.type,
            name: newMaterial.name,
            fileName: result.public_id,
          }
    );

    faculty.save();

    return res.send({ pass: true, subject: docLecture });
  });
}

app.post(
  "/api/professor/lecture/create-material",
  upload.single("myFile"),
  (req, res) => {
    const {
      newMaterial,
      lecture: frontLecture,
      level: frontLevel,
      subjectId,
    } = req.body;

    if(req.file && newMaterial.type === "file"){
    cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "e-university-profile-pictures",
        use_filename: true,
      },
      (err, result) => {
        if (err) return res.send({ pass: false });

        videoOrFileUpload(req, res, frontLevel, subjectId, frontLecture, newMaterial, result);
      }
    );
  }
  else{
    videoOrFileUpload(req, res, frontLevel, subjectId, frontLecture, newMaterial);
  }
  }
);

app.get("/api/profStudents", checkAuthenticated, (req, res) => {
  const faculty = {};

  userModel.find(
    { faculty: req.user.faculty, isProf: false },
    "firstname lastname email level department picture city",
    (err, users) => {
      if (err) return res.send({ pass: false });

      facultyModel.findOne(
        { name: req.user.faculty },
        "levels departments",
        (err, doc) => {
          if (err) return res.send({ pass: false });

          faculty.levels = doc.levels.length;
          faculty.departments = doc.departments;
          return res.send({ pass: true, users, faculty });
        }
      );
    }
  );
});

app.post("/api/filterStudents", checkAuthenticated, (req, res) => {
  const { filter: filtersData } = req.body;

  for (let filterData in filtersData) {
    if (filterData !== "level") {
      filtersData[filterData] = {
        $regex: "^" + filtersData[filterData].value,
        $options: "i",
      };
    } else {
      filtersData[filterData] = filtersData[filterData].value;
    }
  }

  userModel.find(
    { faculty: req.user.faculty, isProf: false, ...filtersData },
    "firstname lastname email level department picture city",
    (err, users) => {
      return res.send({ pass: true, users });
    }
  );
});

/**
 * Returns details of selected Student
 */
app.post("/api/studentDetails", checkAuthenticated, (req, res) => {
  userModel.findOne(
    { _id: req.body._id },
    "firstname lastname email level department picture city faculty phoneNumber street",
    (err, student) => {
      if (err) return res.send({ pass: false });

      return res.send({ pass: true, student });
    }
  );
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
