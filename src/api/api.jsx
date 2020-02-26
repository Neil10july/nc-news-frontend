import axios from "axios";

const url = "https://nc-news-np.herokuapp.com/api";

const fetchArticles = query => {
  axios.get(url + query).then(res => {
    return res.data;
  });
};

const fetchTopics = () => {};

const incrementVote = (path, body) => {};

const addComment = (path, body) => {};

const removeComment = path => {};

export {
  url,
  fetchArticles,
  fetchTopics,
  incrementVote,
  addComment,
  removeComment
};
