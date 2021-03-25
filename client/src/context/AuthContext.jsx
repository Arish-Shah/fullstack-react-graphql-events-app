import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  userId: null,
  login: (token, userId, expiresIn) => {},
  logout: () => {}
});

export default AuthContext;
