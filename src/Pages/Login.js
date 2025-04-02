import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocalStorage } from '@uidotdev/usehooks'
function Login() {
  const [currentUser, setCurrentUser] = useLocalStorage('user',{})
  const navigate = useNavigate()

  const login = (e) =>{
    e.preventDefault()
    const elements = e.target.elements
    const email = elements.email.value.trim();
    const password = elements.password.value.trim();

    axios.get('https://67e46a692ae442db76d45b31.mockapi.io/users')
    .then(resp => {
      if(resp.status == 200){
        const users = resp.data
        const user = users.filter(user => (user.email === email && user.password === password))

        if(user.length > 0){
          setCurrentUser({...user[0]})
          navigate('/')
        }
        else{
          alert('User does not exist')
        }
      }
    })
    .catch(error => console.log(error))
  }
  return (
    <div className="register-container">
    <h2>Login</h2>
    <form onSubmit={login}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login