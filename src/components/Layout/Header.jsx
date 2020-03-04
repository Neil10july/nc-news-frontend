import React from "react";
import { NavBar } from "../../routes/component.routes";
import "./Layout.css";

const Header = props => {
  const { user, loggedIn } = props;
  return (
    <div id="header">
      <h1 id="logo">[ OFF-BRAND ] NC NEWS</h1>
      <NavBar user={user} loggedIn={loggedIn} />
    </div>
  );
};

export default Header;
