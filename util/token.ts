import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
}

export const createToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
};

export const readToken = (token: string): Payload => {
  if (!token) {
    return {
      userId: null,
    };
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET) as Payload;
  if (!payload?.userId) {
    return {
      userId: null,
    };
  }
  return payload;
};
