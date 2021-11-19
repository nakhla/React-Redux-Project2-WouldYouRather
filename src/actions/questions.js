import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading"
import { saveAnswerToUser } from '../actions/users'
import { createQuestionToUser } from '../actions/users'
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER_Q = 'SAVE_ANSWER_Q'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function createQuestion (question) {
  return {
    type: CREATE_QUESTION,
    question,
  }
}

export function saveAnswerToQuestion (authedUser, id, selectedOption) {
  return {
    type: SAVE_ANSWER_Q,
    payload: {authedUser, id, selectedOption },
  }
}

export function handleCreateQuestion (optionOne, optionTwo){
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => dispatch(createQuestion(question)))
      .then((question) => dispatch(createQuestionToUser(authedUser,question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAddingAnswer (selectedOption,id, authedUser){
  return (dispatch, getState) => {
    //const { authedUser } = getState()
    
    dispatch(showLoading())
 console.log({selectedOption,id, authedUser})
    return saveQuestionAnswer(authedUser, id, selectedOption)
      .then(() => dispatch(saveAnswerToQuestion(authedUser, id, selectedOption)))
      .then(() => dispatch(saveAnswerToUser(authedUser, id, selectedOption)))
      .then(() => dispatch(hideLoading()))
  }
}

  
