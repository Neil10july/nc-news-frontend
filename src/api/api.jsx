import axios from "axios";

const url = "https://nc-news-np.herokuapp.com/api";

const fetchContent = query => {
  return axios.get(url + query).then(res => {
    return res.data;
  });
};

const incrementVote = (content, id, value) => {
  if (content === "comment") {
    return axios.patch(`${url}/comments/${id}`, { inc_votes: value });
  } else if (content === "article") {
    return axios.patch(`${url}/articles/${id}`, { inc_votes: value });
  }
};

const postComment = (user, id, comment) => {
  return axios.post(`${url}/articles/${id}/comments`, {
    username: user,
    body: comment
  });
};

const removeContent = (content, id) => {
  return axios.delete(`${url}/${content}s/${id}`);
};

export { url, fetchContent, incrementVote, postComment, removeContent };
