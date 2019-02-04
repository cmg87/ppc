import React, { Component } from "react";

export default class EditModal extends Component {
  render() {
    return (
      //    Modal
      <div class="modal fade" id="edit" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="Edit">
                Edit Factory
              </h5>
              <button type="button" class="close" data-dismiss="modal" />
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label>{this.props.name}</label>
                  <input
                    onChange={this.props.handleInput}
                    type="email"
                    class="form-control"
                    placeholder="must not use previously selected name"
                    name="name"
                    value={this.props.state.name}
                  />
                  <br />
                  Child Nodes (between 1 and 15):
                  <input
                    onChange={this.props.handleInput}
                    type="number"
                    name="numberToGenerate"
                    value={this.props.state.numberToGenerate}
                    min="1"
                    max="15"
                  />
                  <br />
                  <p>Min / Max (between 1 and 1000):</p>
                  <input
                    onChange={this.props.handleInput}
                    type="number"
                    value={this.props.state.minRange}
                    min="1"
                    max="1000"
                    name="minRange"
                  />
                  <input
                    onChange={this.props.handleInput}
                    type="number"
                    value={this.props.state.maxRange}
                    min="1"
                    max="1000"
                    name="maxRange"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.props.handleEdit}>
                Sumbit Changes
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={this.props.deleteOne}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
