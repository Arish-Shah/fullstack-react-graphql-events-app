import { useRef, useState } from "react";
import styles from "../styles/Auth.module.css";
import http from "../util/http";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

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
    console.log(response);
  };

  const switchMode = () => setIsLogin(state => !state);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formControl}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className={styles.formAction}>
        <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>
        <button type="button" className={styles.switchBtn} onClick={switchMode}>
          Switch to {isLogin ? "Sign up" : "Log in"}
        </button>
      </div>
    </form>
  );
}

export default AuthPage;
