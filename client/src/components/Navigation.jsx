import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";

function Navigation() {
  return (
    <header className={styles.container}>
      <div>
        <h1 className={styles.logo}>Events</h1>
      </div>
      <nav>
        <ul className={styles.links}>
          <li>
            <NavLink activeClassName={styles.active} to="/auth">
              Authenticate
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/events">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/bookings">
              Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
