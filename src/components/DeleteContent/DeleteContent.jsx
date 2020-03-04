import React from "react";
import { api } from "../../routes/component.routes";

const DeleteContent = props => {
  const { content, id, preRenderDelete } = props.args;
  const eraseContent = () => {
    api.removeContent(content, id);
    preRenderDelete(id);
  };

  return (
    <button id="deleteBtn" onClick={eraseContent}>
      Delete {content}
    </button>
  );
};

export default DeleteContent;
