import React from 'react'
import Register from './Register'
import Login from './Login'
import { useAuth } from '../context'
import './LoginWrap.css'

const LoginWrap = () => {
  const { registering, setRegistering } = useAuth()

  React.useEffect(() => document.title = 'Library :: Login', [])

  return (
    <div className="login-wrap">
      <div className="content">
        {registering ? <Register /> : <Login />}
      </div>
      <div className="toggle">
        <button onClick={() => setRegistering(!registering)}>
          {registering ? 'Go to login..' : 'Register?'}
        </button>
        </div>
<div>
  <ul>
    <li>length 12 Letters</li>
    <li>2 Uppercase Letters</li>
    <li>2 Lowercase Letters</li>
    <li>1 Numbers</li>
    <li>1 Special Character</li>
  </ul>

      </div>
    </div>
  )
}

export default LoginWrap
