import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      <div>
        <NavLink to="/">Event</NavLink>
        <div>
          {!authContext.token && <NavLink to="/auth">Authentication</NavLink>}
          <NavLink to="/events">Events</NavLink>
          {authContext.token && <NavLink to="/bookings">Bookings</NavLink>}
        </div>
      </div>
      <div>
        {authContext.token && (
          <button onClick={authContext.logout}>Log out</button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
