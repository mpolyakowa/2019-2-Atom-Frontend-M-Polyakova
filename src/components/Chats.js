import React from 'react'
import {ChatHat} from './ChatHat'
import {Chat} from './Chat'
import '../styles/Chats.css'

export function Chats() {
	return (
        <div className="form">
        <ChatHat/>
        <Chat/>
        </div>
	)
}

