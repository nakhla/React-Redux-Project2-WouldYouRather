import React, { Component } from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {

    state = {
        selectedUser: ''
      };
      
    onValueChange =(e) => {
        this.setState(()=> ({
            selectedUser: e.target.value
        }))
    }
      formSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.selectedUser)
    
         const { dispatch } = this.props
    
         dispatch(setAuthedUser(this.state.selectedUser));
    
        this.setState(() => ({
          selectedUser: ''
        }))
      }

    render() {
        return (
            <div>
                <h3>login</h3>
                <form onSubmit={this.formSubmit}>
                <select onChange={this.onValueChange} value={this.state.selectedUser} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option value="" disabled defaultValue>Select user to login</option>
                    {this.props.users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                    
                </select>
                <button className="btn btn-primary" type='submit' disabled={this.state.selectedUser ===''}>Login</button>
                </form>
                {/* <p>{this.state.selectedUser}</p> */}
            </div>
        )
    }
}


function mapStateToProps ({users}) {
    
    return {
      users: Object.values(users)
    }
  }

export default connect(mapStateToProps)(Login)