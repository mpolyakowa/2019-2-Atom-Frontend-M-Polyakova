import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Chat } from './Chat'
import { Messages } from './Messages'
import { Profile } from './Profile'
import '../styles/MainPage.css'

export const history = createBrowserHistory()
class MainPage extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Chat} />
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/chats/:id">
            <Messages />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default MainPage
