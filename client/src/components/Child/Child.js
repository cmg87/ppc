import React, { Component } from "react";

class Child extends Component {
  render() {
    return (
      <ul>
        {this.props.factories.Children.map(children => {
          return (
            <li className="tree">
              <i className="fa fa-folder fa-small" />
              <span>{children}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Child;
