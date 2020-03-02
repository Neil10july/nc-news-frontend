import React from "react";
import { Link } from "@reach/router";

const Topics = () => {
  return (
    <div>
      <ul id="topicsList">
        <li>
          Coding{" "}
          <Link to="/topics/coding">
            <button className="topicsButton">View articles</button>
          </Link>
        </li>
        <li>
          Cooking{" "}
          <Link to="/topics/cooking">
            <button className="topicsButton">View article</button>
          </Link>
        </li>
        <li>
          Football{" "}
          <Link to="/topics/football">
            <button className="topicsButton">View articles</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Topics;
