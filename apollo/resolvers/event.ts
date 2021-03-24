import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Resolvers } from "~/types/backend";
import { MyContext } from "~/types/context";
import { eventValidator } from "~/util/validators";

export const EventResolver: Resolvers<MyContext> = {
  Event: {
    creator: (parent, _, { prisma }) => {
      return prisma.user.findUnique({
        where: {
          id: parent.creatorId,
        },
      }) as any;
    },
  },
  Query: {
    events: (_, __, { prisma }) => prisma.event.findMany() as any,
  },
  Mutation: {
    createEvent: async (_, { input }, { prisma, userId: creatorId }) => {
      if (!creatorId) {
        throw new AuthenticationError("unauthenticated");
      }
      if (eventValidator(input)) {
        throw new UserInputError("invalid input");
      }

      const event = await prisma.event.create({
        data: { ...input, creatorId },
      });

      return event as any;
    },
  },
};
