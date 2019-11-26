import React, { Component } from 'react'
import { Chat } from './Chat'
import { Messages } from './Messages'
import '../styles/MainPage.css'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'chats',
      id: 0,
    }
    this.updatePage = (value, Id) => {
      this.setState({ page: value, id: Id })
    }
  }

  render() {
    const { id } = this.state
    const { page } = this.state
    if (page === 'chats') {
      return (
        <div className="mainContainer">
          <Chat update={this.updatePage} />
        </div>
      )
    }
    if (page === 'messages') {
      return (
        <div className="mainContainer">
          <Messages update={this.updatePage} id={id} />
        </div>
      )
    }
    return <h1>Messanger</h1>
  }
}

export default MainPage
