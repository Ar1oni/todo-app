import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Menu() {
  const [user, setUser] = useLocalStorage('user',{})
  const navigate = useNavigate()
  const logout = (e) =>{
    e.preventDefault()
    setUser('')
    navigate('/Login')
  }
  return (
    <nav>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        {
          (user && user.email) ? 
          (
            <>
              <li><a href='#' onClick={logout}>Logout</a></li>
            </>
          ):
          (
            <>
              <li><a href="/Login">Login</a></li>
              <li><a href="/Register">Register</a></li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Menu