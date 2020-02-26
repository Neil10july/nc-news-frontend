import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
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
      <Link to="/test">
        <button className="navButton">Test</button>
      </Link>
    </nav>
  );
};

export default NavBar;
