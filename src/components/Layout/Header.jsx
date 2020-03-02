import React from "react";
import "./Layout.css";

const Header = props => {
  const { user, loggedIn } = props;
  return (
    <div>
      <h1>NC_News</h1>
    </div>
  );
};

export default Header;
