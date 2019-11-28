import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Profile.css'
import avatar from '../images/avatar.svg'

export function Profile() {
  return (
    <React.Fragment key="Profile">
      <div className="screen" />
      <div className="profileHat">
        <Link to="/">
          <button className="profileBackBtn" type="button">
            <div className="back_top" />
            <div className="back_middle" />
            <div className="back_bottom" />
          </button>
        </Link>
        <div className="profileName">
          <h1>Edit Profile</h1>
        </div>
        <button className="markBtn" type="button">
          <div className="mark">
            <div className="profile-mark-left" />
            <div className="profile-mark-right" />
          </div>
        </button>
      </div>
      <div className="profileContainer">
        <div className="profileAvatar">
          <img src={avatar} alt="" />
        </div>
        <div className="fullNameContainer">
          <div className="profileExplain">Full Name</div>
          <input type="text" className="profileInput" id="fullName" placeholder="Your full name" />
        </div>
        <div className="usernameContainer">
          <div className="profileExplain">Username</div>
          <input type="text" className="profileInput" id="username" placeholder="@username" />
        </div>
        <div className="profileExplainInContainer">Minumum length is 5 characters</div>
        <div className="bioContainer">
          <div className="profileExplain">Bio</div>
          <textarea className="bio" placeholder="Your bio" />
        </div>
        <div className="profileExplainInContainer">Any details about you</div>
      </div>
    </React.Fragment>
  )
}
