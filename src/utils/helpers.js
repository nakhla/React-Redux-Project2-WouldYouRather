export function formatquestionItem (question, author, authedUser) {
    const { id, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author
  
    return {
      name,
      id,
      optionOne,
      optionTwo,
      timestamp,
      avatar: avatarURL,
    }
  }