import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Chat.css'
import { ChatHat } from './ChatHat'

const API_URL = 'http://127.0.0.1:8000/chats/get/10/'

export function Chat(props) {
  // localStorage.clear()
  const storage = localStorage.getItem('chats')
  const children = []
  let chats = []
  if (storage) {
    chats = JSON.parse(storage)
  }
  const [child, setChild] = useState(chats.length)
  const [messages, setMessages] = useState([])
  useEffect(() => {
    pollItems()
    /* eslint-disable-next-line */
  }, [])

  const pollItems = () => {
    fetch(`${API_URL}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(messages)) {
          setMessages(data)
        }
      })
  }

  const t = setInterval(() => pollItems(), 1000)

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => {
      clearInterval(t)
    }
  })
  function parseDate(date) {
    const date1 = date.split('T')
    const date2 = date1[1].split(':')
    const time = []
    time.push((+date2.slice(0, 2)[0] + 3) % 24)
    time.push(date2.slice(0, 2)[1])
    return time.join(':')
  }
  if (chats) {
    for (let j = 0; j < child; j += 1) {
      const chat = chats[j]
      const { Messages } = chat
      children.push(
        <Link to={`/chats/${j}`} key={`chat${j}`}>
          <button type="button" className="chat" date={Messages[Messages.length - 1].Date} key={j}>
            <div className="chatMainContainer">
              <div className="avatar" />
              <div className="chatContainer">
                <div className="name">{chat.Name}</div>
                <div className="lastMessage">{Messages ? Messages[Messages.length - 1].text : ''}</div>
              </div>
              <div className="chatContainer2">
                <div className="mark">
                  <div className="mark-left" />
                  <div className="mark-right" />
                  <div className="mark-left2" />
                  <div className="mark-right2" />
                </div>
                <div className="time">{Messages ? Messages[Messages.length - 1].time : ''}</div>
              </div>
            </div>
          </button>
        </Link>,
      )
    }
  }
  const { data, date, name } = messages
  children.push(
    <Link to="/backend" key="back">
      <button type="button" className="chat" date={data ? data[data.length - 1].added_at : date} key="back">
        <div className="chatMainContainer">
          <div className="avatar" />
          <div className="chatContainer">
            <div className="name">{name}</div>
            <div className="lastMessage">{data ? data[data.length - 1].content : ''}</div>
          </div>
          <div className="chatContainer2">
            <div className="mark">
              <div className="mark-left" />
              <div className="mark-right" />
              <div className="mark-left2" />
              <div className="mark-right2" />
            </div>
            <div className="time">{data ? parseDate(data[data.length - 1].date) : ''}</div>
          </div>
        </div>
      </button>
    </Link>,
  )
  // console.log(children)
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
//  function for new chat build when create button is clicked

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
