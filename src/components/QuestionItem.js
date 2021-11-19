import React, { Component } from "react";
import { connect } from "react-redux";
import { formatquestionItem } from "../utils/helpers";
import { withRouter, Link } from 'react-router-dom'

class QuestionItem extends Component {
  render() {

    const { question } = this.props;
    // console.log(question);

    const { name, id, optionOne, optionTwo, avatar } = question;

    return (
      <div key={id} className="card">
        <h5 className="card-header">{name} Asks:</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-2">
              <img
                src={avatar}
                alt={`avatar of ${name}`}
                className="rounded-circle img-fluid"
              />
            </div>
            <div className="col-10 border-2 border-start pl-4">
              <h5 className="card-title">Would you rather</h5>
              <p className="card-text">
              <Link  to={`/question/${id}`} className="list-group">
                <br/>
                <li className="list-group-item">{optionOne.text}</li>
                <li className="list-group-item">{optionTwo.text}</li>
              </Link>
              </p>
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

export default withRouter(connect(mapStateToProps)(QuestionItem));
