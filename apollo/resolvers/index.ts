import { BookingResolver } from "./booking";
import { EventResolver } from "./event";
import { UserResolver } from "./user";

export const resolvers = [UserResolver, EventResolver, BookingResolver];
