import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Messages.css'
import compass from '../images/compass.svg'
import microphone from '../images/microphone.svg'
import blackMicrophone from '../images/microphone-black-shape.svg'

export function Messages() {
  const { id } = useParams()
  const children = []
  const storage = localStorage.getItem('chats')
  const chats = JSON.parse(storage)
  let messagesLen = 0

  if (chats[id].Messages) {
    messagesLen = chats[id].Messages.length
  }

  const [len, setLen] = useState(messagesLen)
  const [img, setImg] = useState(new Map())
  const [aud, setAud] = useState(new Map())
  const [rec, setRec] = useState(0)

  function handleKeyDown(event) {
    _onKeyPress(event)
  }

  function location() {
    navigator.geolocation.getCurrentPosition((position) => {
      buildMessage(`https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`, id)
      setLen(len + 1)
    })
  }

  function attachment(event) {
    event.preventDefault()
    const fileList = event.target.files
    selectFiles(fileList)
  }

  function dragOver(event) {
    event.preventDefault()
    event.stopPropagation()
    const res = document.querySelector('.result')
    res.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
  }

  function drop(event) {
    event.preventDefault()
    event.stopPropagation()
    const { files } = event.dataTransfer
    selectFiles(files)
    const res = document.querySelector('.result')
    res.style.backgroundColor = 'rgba(0, 0, 0, 0.08)'
  }

  function dragend(event) {
    event.preventDefault()
    event.stopPropagation()
    const res = document.querySelector('.result')
    res.style.backgroundColor = 'rgba(0, 0, 0, 0.08)'
  }

  function selectFiles(fileList) {
    if (fileList.length === 0) {
      // eslint-disable-next-line no-alert
      alert('No files')
    } else {
      const messages = document.querySelectorAll('.message')
      const date = new Date()
      const hour = date.getHours()
      const min = date.getMinutes()
      const images = []
      for (let i = 0; i < fileList.length; i += 1) {
        const image = <img src={window.URL.createObjectURL(fileList[i])} alt="" height="60px" key={`img${i}`} />
        images.push(image)
      }
      setImg(img.set(messages.length, { img: images, date: `${hour}:${min}` }))
      buildMessage('', id)
      setLen(len + 1)
    }
  }

  function getMedia() {
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = { audio: true }
      let chunks = []

      const onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        const audioBtn = document.querySelector('.audioBtn')

        audioBtn.addEventListener('click', Start)

        function Start() {
          mediaRecorder.start()
          audioBtn.src = blackMicrophone
          audioBtn.alt = ''
          audioBtn.removeEventListener('click', Start)
          audioBtn.addEventListener('click', Stop)
        }

        function Stop() {
          audioBtn.src = microphone
          mediaRecorder.stop()
          audioBtn.removeEventListener('click', Stop)
          audioBtn.addEventListener('click', Start)
        }

        mediaRecorder.onstop = () => {
          const messages = document.querySelectorAll('.message')
          const date = new Date()
          const hour = date.getHours()
          const min = date.getMinutes()
          const audio = document.createElement('audio')
          audio.setAttribute('controls', '')
          audio.controls = true
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          chunks = []
          const audioURL = window.URL.createObjectURL(blob)
          audio.src = audioURL
          const Aud = (
            <div>
              <audio className="audio" src={audioURL} controls>
                <track kind="captions" />
              </audio>
            </div>
          )

          if (len === messages.length) {
            setAud(aud.set(messages.length, { Audio: Aud, date: `${hour}:${min}` }))
            setRec(rec + 1)
          }
        }

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data)
          }
        }
      }

      const onError = (err) => {
        // eslint-disable-next-line no-console
        console.log(`The following error occured: ${err}`)
      }

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError)
    } else {
      // eslint-disable-next-line no-console
      console.log('getUserMedia not supported on your browser!')
    }
  }

  useEffect(() => {
    getMedia()
  })

  if (aud.get(len)) {
    buildMessage('', id)
    setLen(len + 1)
  }

  function choiceMessage(i) {
    if (img.get(i)) {
      return img.get(i).img.map((item) => {
        return item
      })
    }
    if (aud.get(i) && rec) {
      return aud.get(i).Audio
    }
    return chats[id].Messages[i].text
  }

  function choiceDate(i) {
    if (img.get(i)) {
      return img.get(i).date
    }
    if (aud.get(i)) {
      return aud.get(i).date
    }
    return chats[id].Messages[i].time
  }

  useEffect(() => window.scrollTo(0, document.querySelector('.result').scrollHeight))

  function buildMessage(value, Id) {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const message = {
      author: 'You',
      text: value,
      time: `${hour}:${min}`,
      Date: date,
    }
    chats[Id].Messages.push(message)
    localStorage.setItem('chats', JSON.stringify(chats))
  }

  function _onKeyPress(event) {
    const input = document.querySelector('.messageInput')
    if (event.keyCode === 13 && input.value !== '') {
      buildMessage(input.value, input.id)
      input.value = ''
      setLen(len + 1)
    }
  }
  for (let j = 0; j < len; j += 1) {
    children.push(
      <div className="message" key={j}>
        <div className="messageText">{choiceMessage(j)}</div>
        <div className="messageContainer">
          <div className="messageTime">{choiceDate(j)}</div>
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
  return (
    <React.Fragment key="Messages">
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
      <div className="result" onDragOver={dragOver} onDrop={drop} onDragLeave={dragend}>
        {children}
      </div>

      <div className="inputContainer">
        <input
          className="messageInput"
          id={id}
          type="text"
          name="message-text"
          placeholder="Введите сообщение"
          onKeyDown={handleKeyDown}
        />
        <div className="inputClip">
          <input type="image" className="compassBtn" src={compass} alt="" onClick={location} />
          <input type="image" className="audioBtn" src={microphone} alt="" />
          <label htmlFor="attach" className="labelForAttach">
            <input type="file" multiple accept="image/*" className="attachBtn" id="attach" onChange={attachment} />
          </label>
        </div>
      </div>
    </React.Fragment>
  )
}
