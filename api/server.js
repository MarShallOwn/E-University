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
const {v4: uuidv4} = require('uuid');
const nodemailer = require('nodemailer')
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
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground" )

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

/**
 * nodemailer config
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken
  }
})

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

  if(req.user.isAdmin){
    const {
      firstname,
      lastname,
      nationalID,
      faculty,
      level,
      department,
      isProf
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
      isProf
    });
    await user.save();
  
    return res.send({ status: 200, message: "user stored!" });
  }

  return
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

  if(!req.body.data.email) return 

  userModel.findOne({email: req.body.data.email}, (err, user) => {
    if(user){

      // added reset password token and expiry time
      user.resetPasswordToken = uuidv4();
      user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

      user.save()
      .then(savedUser => {
        const link = `http://localhost:3000/auth/reset/${savedUser.resetPasswordToken}`;

        // send reset token password link
        const mailOptions = {
          from: process.env.EMAIL,
          to: savedUser.email,
          subject: "E-University: Password change request",
          html: `<div><h2>Hi ${savedUser.firstname} ${savedUser.lastname}</h2><br><p>Please click on the following button to reset your password this button will expire after 1 hour.</p><button><a style="text-decoration:none;" href='${link}' >Click Here</a></button><p>If you did not request this, please ignore this email and your password will remain unchanged.</p></div>`
        };
  
        transporter.sendMail(mailOptions, (err, info) => {
          if(err) return res.send({pass: false})
          return res.send({pass: true})
        })
      })

    }
    else{
      return res.send({pass: false})
    }
  })
})

/**
 * After user changed his password using the token
 */
app.post("/api/auth/reset/:resetToken", checkNotAuthenticated, (req, res) => {

  const { password, confirmPassword } = req.body.data

  if (password !== confirmPassword) {
    return
  }

  userModel.findOne({resetPasswordToken: req.params.resetToken, resetPasswordExpires: {$gt: Date.now()}}, async (err, user) => {
    if(!user) return res.send({pass: false})

    // set new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires= null;

    // save new password
    user.save((err) => {
      if(err) res.send({pass: false})

      // send confirmation mail
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "E-University: Your Password has been changed",
        html: `<div><h2>Hi ${user.firstname} ${user.lastname}</h2><p>This is a confirmation that the password for your account has just been changed</p></div>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if(err) return res.send({pass: false})

        return res.send({pass: true})
      })
    })
    
  })
})

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
app.post('/api/updateImage', upload.single("myFile"), checkAuthenticated, (req, res) => {
  cloudinary.uploader.upload(req.file.path, {
      folder: "e-university-profile-pictures",
      use_filename: true
  },
  (err, result) => {
      if(!err){
          userModel.findOneAndUpdate({email: req.user.email}, { $set: {picture: result.public_id} }).exec((err, user) => {
              if(!err){
                  user.picture !== 'e-university-profile-pictures/default-image_qtdxwi' && cloudinary.uploader.destroy(user.picture.split('.')[0], (err, result) => err && console.log(err))
                  roomModel.find(
                      {participants: {
                          $all: [{
                              $elemMatch: {
                                  email: req.user.email
                              }
                          }]
                      }
                  }).exec(async (err, rooms) => {
                      if(rooms.length !== 0){
                          for(const room of rooms){
                              for(const i in room.participants){
                                  if(room.participants[i].email === req.user.email){
                                      room.participants[i] = {
                                          ...room.participants[i],
                                          picture: result.public_id,
                                      }
                                  }
                              }
                              await room.markModified('participants');
                              await room.save();
                          }
                      }
                      return res.send({result: result.public_id, pass: true})
                  })
              }
          })
      }
  })
})

/**
 * Update user's Profile details
 */
app.post("/api/updateProfile", checkAuthenticated, (req, res) => {
  const { street, city, phoneNumber } = req.body.data;

  userModel.findOneAndUpdate({email: req.user.email}, {street, city, phoneNumber}, (err, user) => {
    if(user){
      return res.send({pass:true})
    }
    return
  })
})

/**
 * Change user's password
 */
app.post("/api/auth/changePassword", checkAuthenticated, (req, res) => {

  const { currentPassword, newPassword, confirmPassword } = req.body.data

  if(newPassword !== confirmPassword) return

  userModel.findOne({email: req.user.email}, async (err, user) => {
    if(!user) return

    if(await bcrypt.compare(currentPassword, user.password)){
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.save()

      return res.send({pass: true})
    }
    return res.send({pass: false})
  })

})

/**
 *  Change Email
 */
app.post("/api/auth/changeEmail", checkAuthenticated, (req, res) => {
  const { email } = req.body.data

  if(!email) return

  userModel.findOne({email: req.user.email}, (err, user) => {
    if(!user) return

    user.email = email
    user.save()
    return res.send({pass: true})
  })
})

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
              isProf
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
              isProf
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
  userModel.find({isProf: true, faculty: req.user.faculty}, (err, doc) => {
    if(doc){
      const professors = [];
      let professor;

      for(const prof of doc){
        if(prof.email){
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
  
          professors.push(professor)
        }
      }

      return res.send({ professors, pass: true });
    }
    return res.send({pass: false})
  })
})

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
        isProf
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
        isProf
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
                  isProf: req.user.isProf
                },
                {
                  email: otherUser.email,
                  displayname: `${otherUser.firstname} ${otherUser.lastname}`,
                  picture: otherUser.picture,
                  isActive: otherUser.isActive,
                  isProf: otherUser.isProf
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
  const { data } = req.body


  const faculty = new facultyModel({...data});

  await faculty.save((err, result) => {
    if(err) return res.send({pass: false})

    return res.send({pass: true})
  })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
