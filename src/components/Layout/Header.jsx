import React from "react";
import { Link } from "@reach/router";

const Header = props => {
  const { user, loggedIn } = props;
  return (
    <header>
      <h1>NC_News</h1>
      {loggedIn ? (
        <h2>logged in as {user}</h2>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
