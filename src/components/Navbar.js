import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
    render() {

      const {authedUserObj} = this.props
        return (
            <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">&nbsp;<img src="wyrg.png" width="30" height="30" alt=""/> Would You Rather Game</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to='/'>Home <span className="sr-only"></span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add">New question</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav text-end">
          
          <li className="nav-item">
            {authedUserObj && <span className="nav-link" ><img width="12%" src={`${authedUserObj.avatarURL}`} alt="..." className="rounded-circle img-fluid"/> {authedUserObj.name}</span>}
          </li>
          {authedUserObj &&
          <li className="nav-item">
            <a className="nav-link" href="/">Logout</a>
          </li>
          }
          
        </ul>
      </div>
    </nav>
      </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    authedUserObj : users[authedUser],
  };
}
export default  connect(mapStateToProps)(Navbar)