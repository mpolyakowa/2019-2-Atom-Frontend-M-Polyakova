import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ChatHat.css'

export function ChatHat() {
  const [vis, setVis] = useState(0)
  const list = (
    <ul className="list">
      <Link to="profile">
        <div className="items">Profile</div>
      </Link>
    </ul>
  )

  return (
    <div className="hat">
      <div className="hatContainer">
        <label className="btn" htmlFor="box">
          <input
            type="checkbox"
            className="burgerCheckbox"
            id="box"
            onChange={() => {
              setVis(vis + 1)
            }}
          />
          <span />
          {vis % 2 !== 0 && list}
        </label>
      </div>

      <div className="Name">
        <h1>Messenger</h1>
      </div>
      <div className="searchInput">
        {' '}
        <input type="text" value="" />{' '}
      </div>
      <button type="button" className="search" onClick={onSearchBtnClick}>
        <div className="circle"> </div>
        <div className="handle"> </div>
      </button>
    </div>
  )
}

function onSearchBtnClick() {
  const searchInput = document.querySelector('.searchInput > input')
  if (searchInput.style.visibility === 'visible') {
    searchInput.style.visibility = 'hidden'
  } else {
    searchInput.style.visibility = 'visible'
  }
}
