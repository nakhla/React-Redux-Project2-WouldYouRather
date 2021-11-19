import React, { Component } from 'react'
import QuestionItem from './QuestionItem'
import QuestionResult from './QuestionResult'
import { connect } from 'react-redux'


class QuestionsList extends Component {
    render() {
        return (
            <div className="container">
      <nav>
        <div
          className="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active"
            id="nav-unanswered-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-unanswered"
            type="button"
            role="tab"
            aria-controls="nav-unanswered"
            aria-selected="true"
          >
            Unanswered <span className="badge rounded-pill bg-danger">{this.props.questionIds.length}</span>
          </button>
          <button
            className="nav-link"
            id="nav-answered-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-answered"
            type="button"
            role="tab"
            aria-controls="nav-answered"
            aria-selected="false"
          >
            Answered <span className="badge rounded-pill bg-danger">{this.props.answeredQuestionIds.length}</span>
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-unanswered"
          role="tabpanel"
          aria-labelledby="nav-unanswered-tab"
        >
          {this.props.questionIds.map((id) => (
              <QuestionItem key={id} id={id}/>
           ))}
        </div>
        <div
          className="tab-pane fade"
          id="nav-answered"
          role="tabpanel"
          aria-labelledby="nav-answered-tab"
        >
          {this.props.answeredQuestionIds.map((id) => (
              <QuestionResult key={id} id={id}/>
           ))}
        </div>
      </div>
    </div>
            
        )
    }
}

function mapStateToProps ({ questions , users, authedUser}) {
  const answeredQuestionsListUnsorted = Object.keys(users[authedUser].answers);
  const answeredQuestionsList = Object.keys(questions)
    .filter( function( el ) {
      return answeredQuestionsListUnsorted.includes( el );
    } )
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);

  return {
     // ...questions
    questionIds: Object.keys(questions)
      .filter( function( el ) {
        return !answeredQuestionsList.includes( el );
      } )
     .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
     answeredQuestionIds : answeredQuestionsList
  }
}

export default connect(mapStateToProps)(QuestionsList) 