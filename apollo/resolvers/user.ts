import { ApolloError, UserInputError } from "apollo-server-micro";
import cookie from "cookie";
import bcrypt from "bcryptjs";

import { Resolvers } from "~/types/backend";
import { MyContext } from "~/types/context";
import { createToken } from "~/util/token";
import { signupValidator } from "~/util/validators";

export const UserResolver: Resolvers<MyContext> = {
  User: {
    createdEvents: (parent, _, { prisma }) =>
      prisma.event.findMany({ where: { creatorId: parent.id } }) as any,
  },
  Query: {
    me: async (_, __, { prisma, userId: id }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user as any;
    },
  },
  Mutation: {
    signup: async (_, { input }, { res, prisma }) => {
      if (signupValidator(input)) {
        throw new UserInputError("invalid input");
      }

      const hashedPassword = await bcrypt.hash(input.password, 12);

      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });

      const token = createToken({
        userId: user.id,
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 6,
        })
      );

      return user as any;
    },
    login: async (_, { email, password }, { res, prisma }) => {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new ApolloError("user not found");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new ApolloError("incorrect password");
      }

      const token = createToken({
        userId: user.id,
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 6,
        })
      );

      return user as any;
    },
    logout: (_, __, { res, userId }) => {
      if (userId) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize(process.env.COOKIE_NAME, "", {
            maxAge: -1,
            path: "/",
          })
        );
        return true;
      }
      return false;
    },
  },
};
