const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/date");

const user = async id => {
  try {
    const user = await User.findById(id);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (error) {
    throw error;
  }
};

const events = async ids => {
  try {
    const events = await Event.find({ _id: { $in: ids } });
    return events.map(event => transformEvent(event));
  } catch (error) {
    throw error;
  }
};

const event = async id => {
  try {
    const event = await Event.findById(id);
    return transformEvent(event);
  } catch (error) {
    console.log(error);
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    event: event.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
