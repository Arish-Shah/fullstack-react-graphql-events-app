import { AuthenticationError } from "apollo-server-errors";

import { Resolvers } from "~/types/backend";
import { MyContext } from "~/types/context";

export const BookingResolver: Resolvers<MyContext> = {
  Booking: {
    event: (parent, _, { prisma }) =>
      prisma.event.findUnique({ where: { id: parent.eventId } }) as any,
    user: (parent, _, { prisma }) =>
      prisma.user.findUnique({ where: { id: parent.userId } }) as any,
  },
  Query: {
    bookings: (_, __, { prisma, userId }) =>
      prisma.booking.findMany({ where: { userId } }) as any,
  },
  Mutation: {
    bookEvent: async (_, { eventId }, { prisma, userId }) => {
      if (!userId) {
        throw new AuthenticationError("unauthenticated");
      }

      const booking = await prisma.booking.create({
        data: {
          eventId,
          userId,
        },
      });

      return booking as any;
    },
    cancelBooking: async (_, { bookingId: id }, { prisma, userId }) => {
      if (!userId) {
        throw new AuthenticationError("unauthenticated");
      }
      const booking = await prisma.booking.findUnique({ where: { id } });
      if (!booking || booking.userId !== userId) {
        return false;
      }
      await prisma.booking.delete({ where: { id } });
      return true;
    },
  },
};
