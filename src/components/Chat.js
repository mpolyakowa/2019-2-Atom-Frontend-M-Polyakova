import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Chat.css'
import { ChatHat } from './ChatHat'

export function Chat() {
  // localStorage.clear()
  const storage = localStorage.getItem('chats')
  const children = []
  let chats = []
  if (storage) {
    chats = JSON.parse(storage)
  }
  const [child, setChild] = useState(chats.length)
  useEffect(() => window.scrollTo(0, 0))
  if (chats) {
    for (let j = 0; j < child; j += 1) {
      children.push(
        <React.Fragment key={j}>
          <Link to={`/chats/${j}`}>
            <button
              type="button"
              className="chat"
              date={chats[j].Messages[chats[j].Messages.length - 1].Date}
              value={j}
            >
              <div className="chatMainContainer">
                <div className="avatar" />
                <div className="chatContainer">
                  <div className="name">{chats[j].Name}</div>
                  <div className="lastMessage">
                    {chats[j].Messages ? chats[j].Messages[chats[j].Messages.length - 1].text : ''}
                  </div>
                </div>
                <div className="chatContainer2">
                  <div className="mark">
                    <div className="mark-left" />
                    <div className="mark-right" />
                    <div className="mark-left2" />
                    <div className="mark-right2" />
                  </div>
                  <div className="time">
                    {chats[j].Messages ? chats[j].Messages[chats[j].Messages.length - 1].time : ''}
                  </div>
                </div>
              </div>
            </button>
          </Link>
        </React.Fragment>,
      )
    }
  }
  function compare(a, b) {
    const dateA = a.props.children.props.children.props.date
    const dateB = b.props.children.props.children.props.date
    if (dateA > dateB) {
      return 1
    }
    if (dateA < dateB) {
      return -1
    }
    return 0
  }
  return (
    <React.Fragment key="Chat">
      <div className="screen" />
      <div className="form">
        <ChatHat />
        <div className="chatList">{children.sort(compare).reverse()}</div>
        <button
          type="button"
          className="create_btn_container"
          onClick={() => {
            buildChat()
            setChild(child + 1)
          }}
        >
          <div className="btn_elem1" />
          <div className="btn_elem" />
          <div className="btn_elem2" />
          <div className="btn_elem3" />
        </button>
      </div>
    </React.Fragment>
  )
}

function buildChat() {
  // eslint-disable-next-line no-alert
  let name = prompt('Введите название чата или имя контакта', 'User')
  while (!name) {
    // eslint-disable-next-line no-alert
    name = prompt('Вы ничего не ввели! Введите название чата или имя контакта', 'User')
  }
  // eslint-disable-next-line no-alert
  let yourText = prompt('Введите сообщение', 'Hello')
  while (!yourText) {
    // eslint-disable-next-line no-alert
    yourText = prompt('Вы ничего не ввели! Введите название чата или имя контакта', 'User')
  }
  const chats = localStorage.getItem('chats')
  let tmp = JSON.parse(chats)
  const date = new Date()
  const hour = date.getHours()
  const min = date.getMinutes()
  const message = {
    author: 'You',
    text: yourText,
    time: `${hour}:${min}`,
    Date: date,
  }
  const chat = {
    Name: name,
    Messages: [],
  }
  chat.Messages.push(message)
  if (!chats) {
    tmp = []
  }
  tmp.push(chat)
  localStorage.setItem('chats', JSON.stringify(tmp))
}
