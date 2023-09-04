require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

//Logic goes here

module.exports = app;

// importing user context
const User = require("./model/user");

// Register
app.post("/register", async (req, res) => {
  try {
    // get user input
    const { firstName, lastName, email, password } = req.body;

    // validate user input
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All inputs are required!");
    }

    /*
    chech is user exist
    Validate if user exists in our database
    */
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User alrady exists. Please login!");
    }

    encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(`There has been an error: ${error}`);
  }
});

// Login
app.post("/login", (req, res) => {});
