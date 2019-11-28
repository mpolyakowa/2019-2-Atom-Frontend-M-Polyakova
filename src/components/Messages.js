import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../styles/Messages.css'

function Draw() {
  const clip = document.querySelector('.inputClip')
  const ctx = clip.getContext('2d')
  ctx.width = '300px'
  ctx.height = '200px'
  ctx.lineWidth = 10
  ctx.strokeStyle = '#777'
  ctx.beginPath()
  ctx.moveTo(100, 90)
  ctx.lineTo(200, 90)
  ctx.arc(200, 77.5, 12.5, -0.5 * Math.PI, 0.5 * Math.PI)
  ctx.moveTo(200, 65)
  ctx.lineTo(50, 65)
  ctx.arc(50, 90, 25, 0.5 * Math.PI, 1.5 * Math.PI)
  ctx.moveTo(50, 115)
  ctx.lineTo(180, 115)
  ctx.stroke()
  ctx.closePath()
  ctx.strokeStyle = '#fff'
  ctx.beginPath()
  ctx.moveTo(200, 85)
  ctx.lineTo(200, 70)
  ctx.moveTo(50, 110)
  ctx.lineTo(50, 70)
  ctx.stroke()
  window.scrollTo(0, document.querySelector('.result').scrollHeight)
}

export function Messages(props) {
  const { id } = props
  const children = []
  const storage = localStorage.getItem('chats')
  const chats = JSON.parse(storage)
  let messagesLen = 0
  if (chats[id].Messages) {
    messagesLen = chats[id].Messages.length
  }
  const [len, setLen] = useState(messagesLen)
  function handleKeyDown(event) {
    _onKeyPress(event)
    setLen(len + 1)
  }
  useEffect(() => Draw())
  for (let j = 0; j < messagesLen; j += 1) {
    children.push(
      <div className="message">
        {chats[id].Messages[j].text}
        <div className="messageTime">{chats[id].Messages[j].time}</div>
      </div>,
    )
  }
  return (
    <React.Fragment key="Messages">
      <div className="screen" />
      <div className="top">
        <button type="button" className="backBtn" onClick={() => props.update('chats', 0)}>
          <div className="back_top" />
          <div className="back_middle" />
          <div className="back_bottom" />
        </button>
        <div className="bigContainer">
          <div className="messagesHatAvatar"> </div>
          <div className="messagesHatContainer">
            <div className="user"> {chats[id].Name} </div>
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

      <div className="inputContainer">
        <input
          className="messageInput"
          id={id}
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

Messages.propTypes = {
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
}

export function buildMessage(value, id) {
  const storage = localStorage.getItem('chats')
  const chats = JSON.parse(storage)
  const date = new Date()
  const hour = date.getHours()
  const min = date.getMinutes()
  const message = {
    author: 'You',
    text: value,
    time: `${hour}:${min}`,
    Date: date,
  }
  chats[id].Messages.push(message)
  localStorage.setItem('chats', JSON.stringify(chats))
}

function _onKeyPress(event) {
  const input = document.querySelector('.messageInput')
  if (event.keyCode === 13 && input.value !== '') {
    buildMessage(input.value, input.id)
    input.value = ''
  }
}
