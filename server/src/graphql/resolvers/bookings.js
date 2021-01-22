const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: async () => {
    const bookings = await Booking.find();
    return bookings.map(booking => transformBooking(booking));
  },
  bookEvent: async ({ id }) => {
    const event = await Event.findById(id);
    const booking = new Booking({
      event: event,
      user: "60086ed3789d5227b8a7bcfa"
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async ({ id }) => {
    const booking = await Booking.findById(id).populate("event");
    const event = transformEvent(booking.event);
    await Booking.deleteOne({ _id: id });
    return event;
  }
};
