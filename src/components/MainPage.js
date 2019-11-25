import React, { Component } from 'react'
import {Chats} from './Chats'
import {Messages} from './Messages'
import ReactDOM from 'react-dom'
import '../styles/MainPage.css'

class MainPage extends Component {
	render() {
		return (
		<React.Fragment>
			<div className="mainContainer">
				<div className="stor"/>
				<Chats/>
			 </div> 
			 <div className="mainContainer1"/>  
	  	 </React.Fragment>
    	)
	}
}

export function onChatClick(event) {
	const id = event.currentTarget.value
	const container = document.querySelector('.mainContainer')
	const container1 = document.querySelector('.mainContainer1')
	ReactDOM.render(
		<React.Fragment>
		<div className="stor1"/>
		<Messages id={id}/>
		</React.Fragment>,
		container1
	)
	const stor1 = document.querySelector('.stor1')
	stor1.style.zIndex = '1'
	container.style.display = 'none'
	container1.style.display = 'block'
	const start = Date.now()
	const timerId = setInterval(() => interval1(start), 10)
	setTimeout(() => { clearInterval(timerId); stor1.style.zIndex = '-1'}, 500)
}

function interval1(start) {
	const timePassed = Date.now() - start
	draw1(timePassed)
}

function draw1(timePassed) {
	const opacity = (1 - timePassed/500)
	const str = `rgba(255,255,255,${opacity})`
	const stor1 = document.querySelector('.stor1')
	stor1.style.backgroundColor = str
}

export function onBackBtnClick() {
	const container = document.querySelector('.mainContainer')
	const container1 = document.querySelector('.mainContainer1')
	ReactDOM.render(
		<React.Fragment>
		<div className="stor"/>
		<Chats/>
		</React.Fragment>,
		container
	)
	const stor = document.querySelector('.stor')
	container1.style.display = 'none'
	container.style.display = 'block'
	stor.style.zIndex = '1'
	const start = Date.now()
	const timerId = setInterval(() => interval(start), 10)
	setTimeout(() => { clearInterval(timerId); stor.style.zIndex = '-1'}, 500)
}

function interval(start) {
	const timePassed = Date.now() - start
	draw(timePassed)
}

function draw(timePassed) {
	const opacity = (1 - timePassed/500)
	const str = `rgba(255,255,255,${opacity})`
	const stor = document.querySelector('.stor')
	stor.style.backgroundColor = str
}

export default MainPage