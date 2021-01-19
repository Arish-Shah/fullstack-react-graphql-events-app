const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const schema = require("./schema");
const resolver = require("./resolver");

const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolver
  })
);

app.listen(process.env.PORT || 8080);
