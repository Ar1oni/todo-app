import axios from 'axios';
import React from 'react'
import {useNavigate} from 'react-router-dom';
function Register() {

  const navigate  = useNavigate()

  const register = (e) => {
    e.preventDefault();
    const elements = e.target.elements
    const name = elements.name.value.trim();
    const surname = elements.surname.value.trim();
    const email = elements.email.value.trim();
    const password = elements.password.value.trim();
    const confirmPassword = elements.confirmPassword.value.trim();

    if(password === confirmPassword){
      axios.post(
        'https://67e46a692ae442db76d45b31.mockapi.io/users', 
        { name, surname, email, password }
      )
      .then(resp => {
        if(resp.status === 201){
          navigate('/Login');
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.log(error.response?.data || error.message);
        alert('Failed to register. Please check your input.');
      });
      
    }
    else{
      alert('Password and Confirm Password must match')
    }
  };


  return (
    
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={register}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register