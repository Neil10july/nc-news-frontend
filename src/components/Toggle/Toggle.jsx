import React, { Component } from "react";

class Toggle extends Component {
  state = { isShowing: false };
  render() {
    return (
      <div>
        <button id="toggleBtn" onClick={this.showing}>
          {this.props.text}
        </button>
        {this.state.isShowing && this.props.children}
      </div>
    );
  }

  showing = () => {
    this.setState(currentState => {
      return { isShowing: !currentState.isShowing };
    });
  };
}

export default Toggle;
