const DataLoader = require("dataloader");
const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/date");

const eventLoader = new DataLoader(ids => {
  return events(ids);
});

const userLoader = new DataLoader(ids => {
  return User.find({ _id: { $in: ids } });
});

const user = async id => {
  const user = await userLoader.load(id.toString());
  return {
    ...user._doc,
    createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
  };
};

const events = async ids => {
  const events = await Event.find({ _id: { $in: ids } });
  return events.map(event => transformEvent(event));
};

const event = async id => {
  try {
    const event = await eventLoader.load(id.toString());
    return event;
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
