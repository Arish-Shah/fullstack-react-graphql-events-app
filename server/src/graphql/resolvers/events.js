const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => transformEvent(event));
    } catch (error) {
      console.log(error);
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
    const result = await event.save();
    const user = await User.findById("60086ed3789d5227b8a7bcfa");
    user.createdEvents.push(event);
    await user.save();
    return transformEvent(result);
  }
};
