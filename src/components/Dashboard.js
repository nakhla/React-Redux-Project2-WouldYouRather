import React, { Component } from 'react'
import QuestionsList from './QuestionsList'

export default class Dashboard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <QuestionsList/>
            </div>
        )
    }
}


