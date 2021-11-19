import React, { Component } from "react";
import { connect } from "react-redux";
import { formatquestionItem } from "../utils/helpers";
import { withRouter, Link } from 'react-router-dom'


class QuestionResult extends Component {
  render() {

    const { question, optionOneVoters, optionTwoVoters, optionOnePercentage, optionTwoPercentage, b_AuthedUserVotedOptionOne } = this.props;
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
              <Link  to={`/question/${id}`} className="card-text">
                <form>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value={optionOne.text}
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      disabled={true}
                      checked={b_AuthedUserVotedOptionOne}
                    />
                    <label className="form-check-label" >
                      {optionOne.text}
                    </label>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: optionOnePercentage}}  aria-valuemin="0" aria-valuemax="100">{optionOnePercentage} - Votes: {optionOneVoters}</div>
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value={optionTwo.text}
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      disabled={true}
                      checked={!b_AuthedUserVotedOptionOne}
                    />
                    <label className="form-check-label" >
                      {optionTwo.text}
                    </label>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: optionTwoPercentage}}  aria-valuemin="0" aria-valuemax="100">{optionTwoPercentage} - Votes: {optionTwoVoters}</div>
                    </div>
                  </div>
                </form>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const optionOneVoters = question.optionOne.votes.length
  const optionTwoVoters = question.optionTwo.votes.length
  const totalVoters = optionOneVoters + optionTwoVoters ;
  console.log(question);
  return {
    authedUser,
    question: formatquestionItem(question, users[question.author], authedUser),
    optionOneVoters : optionOneVoters,
    optionTwoVoters : optionTwoVoters,
    optionOnePercentage : ((optionOneVoters/totalVoters) *100).toFixed(2).toString() + '%'  ,
    optionTwoPercentage : ((optionTwoVoters/totalVoters) *100).toFixed(2).toString() + '%'  ,
    b_AuthedUserVotedOptionOne : question.optionOne.votes.includes(authedUser) ,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionResult));
