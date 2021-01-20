const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");
      return events;
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async ({ eventInput }) => {
    const { title, description, price, date } = eventInput;
    const event = new Event({
      title: title,
      description: description,
      price: price,
      date: new Date(date),
      creator: "60086ed3789d5227b8a7bcfa"
    });

    try {
      const result = await event.save();
      const user = await User.findById("60086ed3789d5227b8a7bcfa");
      user.createdEvents.push(event);
      await user.save();
      return result;
    } catch (err) {
      console.log(err);
    }
  },
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
      return result;
    } catch (err) {
      console.log(err);
    }
  }
};
