import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Chat } from './Chat'
import { Messages } from './Messages'
import { Profile } from './Profile'
import '../styles/MainPage.css'

class MainPage extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Chat />
          </Route>
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
