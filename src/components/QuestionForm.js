import React, { Component } from "react";
import { connect } from "react-redux";
import { formatquestionItem } from "../utils/helpers";
import { withRouter } from 'react-router-dom'
import { handleAddingAnswer } from "../actions/questions";

class QuestionForm extends Component {

  state = {
    selectedOption: ''
  };
  
  onValueChange =(e) => {
    this.setState(()=> ({
        selectedOption: e.target.value
    }))
}
  formSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.selectedOption)

    const {selectedOption} =this.state
    const { dispatch, id, authedUser} = this.props

    dispatch(handleAddingAnswer(selectedOption, id, authedUser));

    this.setState(() => ({
      selectedOption: ''
    }))
  }


  render() {

    const { question } = this.props;

    if (question === null) {
      return <p>This Questions doesn't exist</p>
    }

    const { name, id, optionOne, optionTwo, avatar } = question;

    return (
      <div key={id} className="card">
        <h5 className="card-header">{name} Asks:</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-2">
              <img
                src={`../.${avatar}`}
                alt="..."
                className="rounded-circle img-fluid"
              />
            </div>
            <div className="col-10 border-2 border-start pl-4">
              <h5 className="card-title">Would you rather</h5>
              <div className="card-text">
                <form onSubmit={this.formSubmit}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value="optionOne"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked={this.state.selectedOption === "optionOne"}
                      onChange={this.onValueChange}
                    />
                    <label className="form-check-label">
                      {optionOne.text}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value="optionTwo"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked={this.state.selectedOption === "optionTwo"}
                      onChange={this.onValueChange}
                    />
                    <label className="form-check-label">
                      {optionTwo.text}
                    </label>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={this.state.selectedOption ===''}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log(question);
  return {
    authedUser,
    question: formatquestionItem(question, users[question.author], authedUser),
  };
}

export default withRouter(connect(mapStateToProps)(QuestionForm));
