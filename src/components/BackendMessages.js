import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000/chats/get/10/'
const SEND_URL = 'http://127.0.0.1:8000/chats/send/'

export function BackMessages(props) {
  const [messages, setMessages] = useState([])
  function handleKeyDown(event) {
    _onKeyPress(event)
  }
  const messageEndRef = useRef(null)
  const children = []
  if (messages.data) {
    for (let j = 0; j < messages.data.length; j += 1) {
      children.push(
        <div className="message" key={j}>
          <div className="messageText">{messages.data[j].content}</div>
          <div className="messageContainer">
            <div className="messageTime">{parseDate(messages.data[j].date)}</div>
            <div className="messagesMark">
              <div className="mark-left" />
              <div className="mark-right" />
              <div className="mark-left2" />
              <div className="mark-right2" />
            </div>
          </div>
        </div>,
      )
    }
  }
  useEffect(() => {
    // scroll()
    pollItems()
    /* eslint-disable-next-line */
  }, [])
  const pollItems = () => {
    fetch(`${API_URL}`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(messages)) {
          setMessages(data)
        }
      })
  }
  const scroll = () => {
    messageEndRef.current.scrollIntoView()
  }
  const t = setInterval(() => pollItems(), 1000)
  useEffect(() => {
    scroll()
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

  function _onKeyPress(event) {
    const input = document.querySelector('.messageInput')
    if (event.keyCode === 13 && input.value !== '') {
      fetch(`${SEND_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          chat: '10',
          content: input.value,
        }),
      })
        .then((res) => res.json())
        /* eslint-disable-next-line */
        .catch(console.log())
      input.value = ''
      pollItems()
    }
  }

  return (
    <React.Fragment key="Back">
      <div className="screen" />
      <div className="top">
        <Link to="/">
          <button type="button" className="backBtn">
            <div className="back_top" />
            <div className="back_middle" />
            <div className="back_bottom" />
          </button>{' '}
        </Link>
        <div className="bigContainer">
          <div className="messagesHatAvatar"> </div>
          <div className="messagesHatContainer">
            <div className="user"> {messages.name} </div>
            <div className="online"> Online</div>
          </div>
        </div>
        <div className="messagesHatSearch">
          <div className="messagesHatCircle"> </div>
          <div className="messagesHatHandle"> </div>
        </div>
        <div className="settings">
          <div className="settings_top" />
          <div className="settings_top" />
          <div className="settings_top" />
        </div>
      </div>
      <div className="result">{children}</div>
      <div ref={messageEndRef} />
      <div className="inputContainer">
        <input
          className="messageInput"
          id="backend"
          type="text"
          name="message-text"
          placeholder="Введите сообщение"
          onKeyDown={handleKeyDown}
        />
        <canvas className="inputClip" />
      </div>
    </React.Fragment>
  )
}
