import React from "react";
import "./ArticleList.css";
import { Link } from "@reach/router";
import { SortBy } from "../../routes/component.routes";

const ArticleList = props => {
  const { articles, updateCurrentPath, topic, setPath } = props;
  return (
    <div className="articles">
      <h1 id="topic">{topic}</h1>
      <SortBy setPath={setPath} content={"articles"} />
      <ul id="articlesList">
        {articles.map(article => {
          const date = `${new Date(article.created_at)}`.slice(0, 21);
          return (
            <div className="articlesContent" key={article.article_id}>
              <li>
                <Link
                  id="listTitle"
                  onClick={() => {
                    updateCurrentPath(`/articles/${article.article_id}`);
                  }}
                  to={`/articles/${article.article_id}`}
                >
                  {article.title}
                </Link>
              </li>
              <li>Posted · {date}</li>
              <li>Topic · {article.topic}</li>
              <li>By · {article.author}</li>
              <li>
                {article.votes} Votes · {article.comment_count} Comments
              </li>
              <br />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
