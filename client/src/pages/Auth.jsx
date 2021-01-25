import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import http from "../util/http";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const authContext = useContext(AuthContext);

  const emailEl = useRef();
  const passwordEl = useRef();

  const handleSubmit = async event => {
    event.preventDefault();
    const email = emailEl.current.value.trim();
    const password = passwordEl.current.value.trim();

    if (email.length === 0 || password.length === 0) return;

    let QUERY;

    if (isLogin) {
      QUERY = `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            expiresIn
          }
        }
      `;
    } else {
      QUERY = `
        mutation {
          createUser(userInput: { email: "${email}", password: "${password}" }) {
            _id
            email
          }
        }
      `;
    }

    const response = await http(QUERY);
    if (response.data.login.token) {
      authContext.login(
        response.data.login.token,
        response.data.login.userId,
        response.data.login.expiresIn
      );
    }
  };

  const switchMode = () => setIsLogin(state => !state);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-group">
        <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>
        <button type="button" onClick={switchMode}>
          Switch to {isLogin ? "Sign up" : "Log in"}
        </button>
      </div>
    </form>
  );
}

export default AuthPage;
