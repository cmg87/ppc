import React, { Component } from "react";
import Generate from "../components/Generate/Generate";
import Factory from "../components/Factory/Factory";
import Root from "../components/Root/Root";
import Modal from "../components/Modal/Modal";
import API from "../utils/API";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      factories: [],
      name: "",
      minRange: 1,
      maxRange: 1000,
      numberToGenerate: 1
    };
  }

  handleGenerate = (min, max) => {
    let random = Math.floor(Math.random() * (max - min) + min);
    return random;
  };

  handleCreateFactories = numberOfFactories => {
    let randomNumbers = [];
    for (let i = 0; i < numberOfFactories; i++) {
      randomNumbers.push(
        this.handleGenerate(this.state.minRange, this.state.maxRange)
      );
    }
    return randomNumbers;
  };

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let children = this.handleCreateFactories(this.state.numberToGenerate);
    let factory = {
      name: this.state.name,
      children: children
    };
    API.createFactory(factory);
    this.setState({
      name: "",
      minRange: 1,
      maxRange: 1000,
      numberToGenerate: 1
    });
  };

  componentDidMount() {
    API.getFactory()
      .then(res => this.setState({ factories: res.data }))
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    API.getFactory()
      .then(res => this.setState({ factories: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <Generate />
        <Root />
        <Factory factories={this.state.factories} />
        <Modal
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInputChange}
          state={this.state}
        />
      </div>
    );
  }
}

export default Main;
