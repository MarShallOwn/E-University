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
const initalizePassport = require("./passport-config");
const userModel = require("./models/Users");
const roomModel = require("./models/Rooms");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 8080;

/**
 * Cloudinary Config
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
  console.log("check");
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
app.post("/api/storeUser", async (req, res) => {
  const {
    firstname,
    lastname,
    nationalID,
    faculty,
    level,
    department,
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
  });
  await user.save();

  return res.send({ status: 200, message: "user stored!" });
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
app.post("/api/continueRegister", async (req, res) => {
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

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.findOne({ nationalID }, (err, user) => {
    if (!err && !user.email) {
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
 * Get logged in user data
 */
app.get("/api/user", (req, res) => {
  let user;
  if (req.user) {
    const {
      firstname,
      lastname,
      email,
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
            });
          }
        }
      }
      return res.json(users);
    });
});

/**
 * get the user that is searched for
 */
app.get("/api/chat/search", checkAuthenticated, (req, res) => {
  // will change this with exact value soon
  //const cond = req.query.username.length !== 0 ? {$regex: '^' + req.query.username, $options: 'i'} : null;
  userModel.findOne({ email: req.query.email }).exec((err, user) => {
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
  if (!req.user) {
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
                },
                {
                  email: otherUser.email,
                  displayname: `${otherUser.firstname} ${otherUser.lastname}`,
                  picture: otherUser.picture,
                  isActive: otherUser.isActive,
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

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
