
import { RECEIVE_QUESTIONS, CREATE_QUESTION, SAVE_ANSWER_Q } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }    
    case CREATE_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    case SAVE_ANSWER_Q :
      return {
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            [action.payload.selectedOption]:{
              ...state[action.payload.id][action.payload.selectedOption] ,
              votes:[
                ...state[action.payload.id][action.payload.selectedOption].votes.concat(action.payload.authedUser)
              ]
            }
        }
      }
    default :
      return state
  }
}




