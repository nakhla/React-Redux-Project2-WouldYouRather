import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const {leaderboard} = this.props
        return (
            <div>
                <h3>Leaderboard</h3>
                <table className="table align-middle">
                    <thead className="table" align="center">
                        <tr>
                        <th scope="col">#Rank</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">User</th>
                        <th scope="col">Answer No.</th>
                        <th scope="col">Question No.</th>
                        <th scope="col">Total Score</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                    {leaderboard.map((user, index) => (
                        <tr key={user.id}>
                        <th scope="row"><h2>{index+1}</h2></th>
                        <td width="10%"><img src={`../.${user.avatarURL}`} alt="..." className="rounded-circle img-fluid"/></td>
                        <td><h4>{user.name}</h4></td>
                        <td><h5>{user.totalAnswers}</h5></td>
                        <td><h5>{user.totalQuestions}</h5></td>
                        <td><span className="badge rounded-pill bg-light text-dark"><h2>{user.totalScore}</h2></span></td>
                    </tr>
                    ))} 
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps ({users}){
    const leaderboardArray = Object.values(users)
    const leaderboard = leaderboardArray.map(user => ({
        id:user.id,
        name:user.name,
        avatarURL:user.avatarURL,
        totalAnswers: Object.values(user.answers).length,
        totalQuestions: user.questions.length,
        totalScore: Object.values(user.answers).length + user.questions.length
    })).sort((a,b)=> b.totalScore-a.totalScore)

    
    return{
        leaderboard
    }
}
export default connect(mapStateToProps)(Leaderboard)