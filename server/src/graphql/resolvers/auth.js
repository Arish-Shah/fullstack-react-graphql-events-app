const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async ({ userInput }) => {
    const { email, password } = userInput;
    const userFound = await User.findOne({ email: email });

    if (userFound) {
      return new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword
    });
    const result = await user.save();
    return {
      ...result._doc,
      password: null
    };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password incorrect");
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      "secret",
      {
        expiresIn: "1h"
      }
    );
    return {
      userId: user._id,
      token: token,
      expiresIn: 1
    };
  }
};
