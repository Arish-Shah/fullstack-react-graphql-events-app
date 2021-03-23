import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    me: User
    events: [Event!]!
    bookings: [Booking!]!
  }

  type Mutation {
    signup(input: UserInput): User
    login(email: String!, password: String!): User
    logout: Boolean!
    createEvent(input: EventInput): Event!
    bookEvent(id: ID!): Booking!
    cancelBooking(id: ID!): Event!
  }

  type User {
    id: ID!
    email: String!
    createdEvents: [Event!]!
    createdAt: Date!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    price: Float!
    date: Date!
    creator: User!
    createdAt: Date!
  }

  type Booking {
    id: ID!
    event: Event!
    user: User!
    createdAt: Date!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: Date!
  }

  scalar Date
`;
