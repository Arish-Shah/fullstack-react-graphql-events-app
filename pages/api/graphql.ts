import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

import { schema } from "~/graphql/schema";
import { readToken } from "~/util/token";

const prisma = new PrismaClient();

interface ContextArgs {
  req: NextApiRequest;
  res: NextApiResponse;
}

const server = new ApolloServer({
  schema,
  context: ({ req, res }: ContextArgs) => {
    const { userId } = readToken(req.cookies[process.env.COOKIE_NAME] || "");

    return {
      res,
      prisma,
      userId,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
