import React from 'react'
import '../styles/ChatHat.css'

export function ChatHat() {
	return (
        <div className="hat">
            <div className="hatContainer">
            <input type="checkbox" id="box"/>
            <label className="btn" htmlFor="box">
            <span/>
            </label>
            <ul className="list">
            <li>Create new chat</li>
            <li>Settings</li>
            </ul>
            </div>
       
        <div className="Name"><h1>Messenger</h1></div>
        <div className="searchInput"> <input type="text" value=""/> </div>
        <button 
            className="search" onClick={onSearchBtnClick}>
            <div className="circle"> </div>
            <div className="handle"> </div>
        </button>
    </div>

	)
}

// function onBurgerBtnClick() {
//     alert("skdkkkd")
//     const menu = document.getElementById('.list')
//     alert(menu)
//     // if (menu.style.visibility === 'hidden') {
//     //     menu.style.visibility = 'visible'
//     // } else {
//     //     menu.style.visibility = 'hidden'
//     // }
// }

function onSearchBtnClick() {
    const searchInput = document.querySelector('.searchInput > input')
    if (searchInput.style.visibility === 'visible') {
        searchInput.style.visibility = 'hidden'
    } else {
        searchInput.style.visibility = 'visible'
    }
}

