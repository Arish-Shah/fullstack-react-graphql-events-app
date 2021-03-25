import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        FullStack Events App
      </NavLink>
      <div className="nav-items">
        {!authContext.token && <NavLink to="/auth">Authentication</NavLink>}
        <NavLink to="/events">Events</NavLink>
        {authContext.token && <NavLink to="/bookings">Bookings</NavLink>}
        {authContext.token && (
          <button onClick={authContext.logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
