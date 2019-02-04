import React, { Component } from "react";
import Child from "../Child/Child";

class Factory extends Component {
  render() {
    return (
      <ul className="tree">
        {this.props.factories.map(factories => {
          return (
            <li>
              <i
                className="fa fa-folder fa-lg"
                data-toggle="modal"
                data-target="#edit"
                id={factories._id}
                onClick={this.props.handleID}>
                <span>{factories.FactoryName}</span>
              </i>
              <Child factories={factories} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Factory;
