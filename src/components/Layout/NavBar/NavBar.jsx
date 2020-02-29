import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";

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
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
