import React from "react";

const SortBy = props => {
  return (
    <div>
      <label>Sort by</label>{" "}
      <select
        onChange={event => {
          props.generateQuery(event);
        }}
      >
        <option value="Newest">Newest first</option>
        <option value="Oldest">Oldest first</option>
        <option value="Highest_rated">Highest rated</option>
        <option value="Lowest_rated">Lowest rated</option>
        <option value="Most_comments">Most comments</option>
        <option value="Least_comments">Least comments</option>
      </select>
    </div>
  );
};

export default SortBy;
