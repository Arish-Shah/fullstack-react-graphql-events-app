const bcrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  createUser: async ({ userInput }) => {
    const { email, password } = userInput;
    try {
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
    } catch (error) {
      throw error;
    }
  }
};
