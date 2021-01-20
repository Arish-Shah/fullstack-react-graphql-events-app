const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 8080, () => console.log("Server started"));
  })
  .catch(err => {
    console.log(err);
  });
