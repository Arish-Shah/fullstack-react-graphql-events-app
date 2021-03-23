import { ApolloServer } from "apollo-server-micro";

import { schema } from "~/graphql/schema";

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
