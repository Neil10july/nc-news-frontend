import React from "react";
import { Link } from "@reach/router";
import "./Layout.css";

const NavBar = props => {
  const { user, loggedIn } = props;
  return (
    <div className="nav">
      <nav id="leftNav">
        <Link to="/">
          <button className="navButton"> Home </button>
        </Link>
        <Link to="/topics">
          <button className="navButton"> Topics </button>
        </Link>
        <Link to="/articles">
          <button className="navButton"> Articles </button>
        </Link>
      </nav>
      {loggedIn ? (
        <nav id="rightNav">
          <Link to="/home">
            <button className="navButton" id="postBtn">
              Post article
            </button>
          </Link>
          <Link to="/home">
            <button className="navButton" id="userBtn">
              Your articles
            </button>
          </Link>
          <p id="loggedIn">
            logged in: <span style={{ color: "orange" }}>{` ${user}`}</span>
          </p>
        </nav>
      ) : (
        <nav id="rightNav">
          <Link to="/signup">
            <button className="navButton" id="signupBtn">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="navButton" id="loginBtn">
              Login
            </button>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
