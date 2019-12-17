import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Cities.css'

export function City() {
  const { id } = useParams()
  return <div> {id} </div>
}
