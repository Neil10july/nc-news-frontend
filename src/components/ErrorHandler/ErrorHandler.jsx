import React from "react";

const ErrorHandler = props => {
  const { msg } = props;

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
};

export default ErrorHandler;
