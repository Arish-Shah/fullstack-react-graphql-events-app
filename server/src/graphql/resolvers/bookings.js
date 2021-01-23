const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: async (_, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const bookings = await Booking.find();
    return bookings.map(booking => transformBooking(booking));
  },
  bookEvent: async ({ id }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const event = await Event.findById(id);
    const booking = new Booking({
      event: event,
      user: req.userId
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async ({ id }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const booking = await Booking.findById(id).populate("event");
    const event = transformEvent(booking.event);
    await Booking.deleteOne({ _id: id });
    return event;
  }
};
