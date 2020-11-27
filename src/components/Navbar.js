import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const Navbar = props => {

    const logout = () => {

        Axios.get('/api/logout', {withCredentials: true})
    }

    return(
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link to="/create-user">Create User</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    )
}

export default Navbar