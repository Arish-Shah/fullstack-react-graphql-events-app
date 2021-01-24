const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const isAuth = require("./middlewares/isAuth");

const app = express();

app.use(express.json());

app.use(cors());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolvers
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
