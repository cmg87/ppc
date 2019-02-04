import React, { Component } from "react";

class Delete extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.deleteAll()}>
          Delete All
        </button>
      </div>
    );
  }
}

export default Delete;
