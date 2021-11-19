import React, { Component } from 'react'
import { connect } from "react-redux";
import QuestionResult from './QuestionResult'
import QuestionForm from './QuestionForm'
import { withRouter, Redirect } from 'react-router-dom'


class QuestionPage extends Component {
    render() {
        const { id , userAnsweredQuestion, questionFound } = this.props


        return (
            <div>
                { !questionFound
                    ? <Redirect to="/notfound" />
                    :
                    
                        userAnsweredQuestion 
                            ? <QuestionResult id={id}/>
                            : <QuestionForm id={id}/>
                
                }
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, users, questions  }, props) {
    const { id } = props.match.params
    const userAnsweredQuestion = users[authedUser].answers[id] ? true : false;
    const questionFound = questions[id] ? true : false;
    return {
      id,
      userAnsweredQuestion ,
      questionFound ,
    }
  }


export default withRouter(connect(mapStateToProps)(QuestionPage));