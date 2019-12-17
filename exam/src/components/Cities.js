import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Cities.css'

export function Cities() {
  // https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [curCity, setCurCity] = useState()
  const [City, setCity] = useState([])
  const [names, setNames] = useState(['Moscow', 'Kiev'])
  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)
  })
  fetch(`https://mars.priver.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b6907d289e10d714a6e88b30761fae22`, {
    method: 'GET',
    // headers: {
    //     origin: document.origin,
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    // }
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data', data.weather[0])
      if (JSON.stringify(data) !== JSON.stringify(curCity)) {
        console.log(123)
        setCurCity(data)
      }
    })

  function addCity() {
    let name = prompt('Введите название города', 'Moscow')
    while (!name) {
      name = prompt('Вы ничего не ввели! ', 'Moscow')
    }
    let n = names
    n.push(name)
    setNames(n)
    console.log('n', names)
  }

  // console.log("here", curCity.length)
  const children = []
  const id = 1
  if (curCity) {
    console.log('ex', curCity)
    children.push(
      <Link to={`/city/${id}`} key={1}>
        <button type="button" className="city">
          <div className="cityName">{curCity.name}</div>
          <div className="weather"></div>
        </button>
      </Link>,
    )
  }
  for (let j = 0; j < names.length; j += 1) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${names[j]}&appid=b41984b8b5135f1695c5faac30990138`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("data", data.weather[0])
        if (JSON.stringify(data) !== JSON.stringify(City)) {
          console.log(data)
          let s = City
          s.push({ name: data.name, weather: data.weather[0].main })
          setCity(s)
        }
      })
    console.log('sis', names)
    children.push(
      <Link to={`/city/${j}`} key={`${j}`}>
        <button type="button" className="city">
          <div className="cityName">{names[j]}</div>
          <div className="weather">123</div>
        </button>
      </Link>,
    )
  }

  return (
    <div className="container">
      {children}
      <button type="button" className="add" onClick={addCity} />
    </div>
  )
}
