import cookie from "cookie";

import { Resolvers } from "~/types/backend";
import { MyContext } from "~/types/context";

export const UserResolver: Resolvers<MyContext> = {
  Mutation: {
    signup: async (_, { input }, { res }) => {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("foo", "this, is some value", {
          httpOnly: true,
        })
      );
      return null;
    },
  },
};
