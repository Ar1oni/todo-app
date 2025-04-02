import React from 'react'
import { FaListCheck } from "react-icons/fa6";
import Menu from './Menu'
function Header() {
  return (
    <header className="header">
    <div className="logo">
      <FaListCheck className="icon" />
      <h1 className="title">To-Do App</h1>
    </div>
    <Menu/>
  </header>
  )
}

export default Header