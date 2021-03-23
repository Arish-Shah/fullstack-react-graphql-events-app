import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

import { EventInput, UserInput } from "~/types/backend";

export const signupValidator = (input: UserInput): boolean => {
  if (!isEmail(input.email)) {
    return true;
  }
  if (!isLength(input.password, 4)) {
    return true;
  }
  return false;
};

export const eventValidator = (input: EventInput): boolean => {
  if (!isLength(input.title, 1)) {
    return true;
  }
  if (!isLength(input.description, 1)) {
    return true;
  }
  return false;
};
