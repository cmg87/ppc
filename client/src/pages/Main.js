import React, { Component } from "react";
import Generate from "../components/Generate/Generate";
import Factory from "../components/Factory/Factory";
import Root from "../components/Root/Root";
import Modal from "../components/Modal/Modal";
import Delete from "../components/Delete/Delete";
import API from "../utils/API";
import "./Main.css";
import EditModal from "../EditFactoryModal/EditModal";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.handleID = this.handleID.bind(this);
    this.deleteOne = this.deleteOne.bind(this);

    this.state = {
      factories: [],
      name: "",
      minRange: 1,
      maxRange: 1000,
      numberToGenerate: 1,
      id: ""
    };

    this.eventSource = new EventSource("/events");
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

  handleID = e => {
    e.preventDefault();
    this.setState({ id: e.target.id });
  };

  handleEdit = e => {
    e.preventDefault();
    let children = this.handleCreateFactories(this.state.numberToGenerate);
    let factory = {
      id: this.state.id,
      name: this.state.name,
      children: children
    };
    API.updateFactory(factory);
    this.setState({
      name: "",
      minRange: 1,
      maxRange: 1000,
      numberToGenerate: 1
    });
  };

  deleteOne = e => {
    let id = this.state.id;
    API.deleteFactory(id);
  };

  deleteAll = e => {
    API.deleteAll();
  };

  componentDidMount() {
    //intial grab of factory data
    API.getFactory()
      .then(res => this.setState({ factories: res.data }))
      .catch(err => console.log(err));

    this.eventSource.onmessage = e => {
      console.log(e.data);
      // this.setState({ factories: JSON.parse(e.data) });
    };
  }

  componentDidUpdate() {
    API.getFactory()
      .then(res => this.setState({ factories: res.data }))
      .catch(err => console.log(err));
    // this.eventSource.addEventListener("message", e => {
    //   this.setState({ factories: JSON.parse(e.data) });
    // });
    // this.eventSource.onmessage = e =>
    //   this.setState({ factories: JSON.parse(e.data) });
  }

  render() {
    return (
      <div className="container">
        <Generate />
        <Delete deleteAll={this.deleteAll} />
        <Root />
        <Factory factories={this.state.factories} handleID={this.handleID} />
        <Modal
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInputChange}
          state={this.state}
        />
        <EditModal
          handleEdit={this.handleEdit}
          state={this.state}
          handleInput={this.handleInputChange}
          deleteOne={this.deleteOne}
        />
      </div>
    );
  }
}

export default Main;
