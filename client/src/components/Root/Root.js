import React, { Component } from "react";
import "./Root.css";

class Root extends Component {
  render() {
    return (
      <ul className="tree">
        <i className="fa fa-folder fa-2x" aria-hidden="true" />
        <span>Root</span>
      </ul>
    );
  }
}

export default Root;
