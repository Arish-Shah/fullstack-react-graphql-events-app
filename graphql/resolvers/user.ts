import cookie from "cookie";
import bcrypt from "bcryptjs";

import { Resolvers } from "~/types/backend";
import { MyContext } from "~/types/context";

export const UserResolver: Resolvers<MyContext> = {
  Mutation: {
    signup: async (_, { input }, { res, prisma }) => {
      const hashedPassword = await bcrypt.hash(input.password, 12);

      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("foo", "this, is some value", {
          httpOnly: true,
        })
      );

      return user as any;
    },
  },
};
