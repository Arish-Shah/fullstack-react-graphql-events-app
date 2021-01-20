const Event = require("./models/event");

const events = [];

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
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
      date: new Date(date)
    });
    try {
      const result = await event.save();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
};
