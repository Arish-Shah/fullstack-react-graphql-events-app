import { PrismaClient } from ".prisma/client";
import { ApolloServer } from "apollo-server-micro";

import { schema } from "~/graphql/schema";

const prisma = new PrismaClient();

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, prisma }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
