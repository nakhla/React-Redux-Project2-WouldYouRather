import { CREATE_QUESTION_U, RECEIVE_USERS, SAVE_ANSWER_U } from "../actions/users";

export default function users (state = {}, action) {
    switch(action.type){
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER_U :
            const {authedUser, id, selectedOption} = action.payload;
            console.log({authedUser, id, selectedOption})
            return {
                ...state,
                    [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [id]: selectedOption
                    }
                }
            }
        case CREATE_QUESTION_U:
            console.log(action.payload.authedUser)
            return {
                ...state,
                [action.payload.authedUser]:{
                    ...state[action.payload.authedUser],
                    questions: state[action.payload.authedUser].questions.concat(action.payload.id)
                }
            }
        default :
            return state

    }
}