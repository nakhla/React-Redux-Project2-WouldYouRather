import React, { Component , Fragment} from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route , Switch} from 'react-router-dom'
import history from "./history";
import QuestionPage from './components/QuestionPage';

import "./App.css"
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import  LoadingBar from 'react-redux-loading';
import QuestionNew from './components/QuestionNew';
import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';
import Login from './components/Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router history={history}>
        <Fragment>
          <LoadingBar/>
          <div className="container">
            <Navbar/>
            {this.props.loading === true
              ? <Login/>
              : <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/add' component={QuestionNew} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route component={NotFound} />
                </Switch> 
            }
          </div>
         </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)