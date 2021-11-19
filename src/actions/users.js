export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_U = 'SAVE_ANSWER_U'
export const CREATE_QUESTION_U = 'CREATE_QUESTION_U'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function saveAnswerToUser (authedUser, id, selectedOption) {
    return {
      type: SAVE_ANSWER_U,
      payload: {authedUser, id, selectedOption },
    }
  }

  export function createQuestionToUser (authedUser, id) {
    return {
      type: CREATE_QUESTION_U,
      payload: {authedUser, id },
    }
  }