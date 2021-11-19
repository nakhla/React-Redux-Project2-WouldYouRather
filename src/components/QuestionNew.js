import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class QuestionNew extends Component {

    state ={
        optionOne: '',
        optionTwo: '',
        toHome: false
    }
    handleChange =(e) => {
        const value = e.target.value;

        this.setState(()=> ({
            [e.target.name]: value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo,} =this.state


        //add question  to the Store
        const { dispatch} = this.props
    
        dispatch(handleCreateQuestion(optionOne, optionTwo));
    
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))

        console.log('new question:', optionOne + optionTwo)

        
    }
    render() {
        const {optionOne , optionTwo, toHome} = this.state

        if (toHome ===true){
            return <Redirect to='/'/>
        }
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>

                <div className="card text-center">
                <div className="card-header">
                    Would You Rather
                </div>
                <div className="card-body">
                    <input className="form-control" name="optionOne" type="text" value={optionOne} onChange={this.handleChange} placeholder="Option One"/>
                    Or
                    <input className="form-control" name="optionTwo" type="text" value={optionTwo} onChange={this.handleChange} placeholder="Option Two"/>
                    
                </div>
                <div className="card-footer">
                <button className="btn btn-primary" type='submit' disabled={optionOne===''|| optionTwo===''}>Submit</button>
                </div>
                </div>
                </form>
            </div>
        )
    }
}
export default connect()(QuestionNew)