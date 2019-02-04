import React, { Component } from "react";

class Generate extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#generate">
          Generate
        </button>
      </div>
    );
  }
}

export default Generate;
