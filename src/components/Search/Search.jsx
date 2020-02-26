import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = { refObj: {}, result: [] };
  render() {
    return (
      <div>
        <form>
          <input id="searchBox" type="text" placeholder=""></input>
          <button>Search</button>
        </form>
      </div>
    );
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
}

export default Search;
