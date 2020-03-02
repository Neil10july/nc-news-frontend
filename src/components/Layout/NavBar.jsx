import React from "react";
import { Link } from "@reach/router";
import "./Layout.css";

const NavBar = props => {
  const { user, loggedIn } = props;
  return (
    <nav className="navbar">
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>
      <Link to="/topics">
        <button className="navButton"> Topics</button>
      </Link>
      <Link to="/articles">
        <button className="navButton"> Articles</button>
      </Link>
      {loggedIn ? (
        <h2>logged in as {user}</h2>
      ) : (
        <React.Fragment>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </React.Fragment>
      )}
    </nav>
  );
};

export default NavBar;
