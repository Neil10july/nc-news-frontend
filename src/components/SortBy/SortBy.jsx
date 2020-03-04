import React from "react";

const SortBy = props => {
  const { id, content, setPath } = props;

  const generateQuery = event => {
    event.preventDefault();

    const query = event.target.value;
    const queryRef = {
      Newest: { sort_by: "created_at", order: "desc" },
      Oldest: { sort_by: "created_at", order: "asc" },
      Highest_rated: { sort_by: "votes", order: "desc" },
      Lowest_rated: { sort_by: "votes", order: "asc" },
      Most_comments: { sort_by: "comment_count", order: "desc" },
      Least_comments: { sort_by: "comment_count", order: "asc" }
    };
    const { sort_by, order } = queryRef[query];

    if (content === "articles") {
      setPath(`/articles?sort_by=${sort_by}&order=${order}`);
    } else if (content === "comments") {
      setPath(`/articles/${id}/comments?sort_by=${sort_by}&order=${order}`);
    }
  };

  return (
    <div id="sortBy">
      <label>Sort by</label>{" "}
      <select
        onChange={event => {
          generateQuery(event);
        }}
      >
        <option value="Newest">Newest first</option>
        <option value="Oldest">Oldest first</option>
        <option value="Highest_rated">Highest rated</option>
        <option value="Lowest_rated">Lowest rated</option>
        {props.content === "articles" && (
          <React.Fragment>
            <option value="Most_comments">Most comments</option>
            <option value="Least_comments">Least comments</option>
          </React.Fragment>
        )}
      </select>
    </div>
  );
};

export default SortBy;
