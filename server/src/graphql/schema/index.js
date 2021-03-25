const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    expiresIn: Int!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(id: ID!): Booking!
    cancelBooking(id: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);