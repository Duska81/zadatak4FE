import React from 'react'
import { useAuth } from '../context'
import Input from '../form/Input'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { login, error } = useAuth()

  const isValid = () => {
    if (username === '') return false
    if (password === '') return false
    return true
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (isValid())
      login(username, password)
  }

  return (
    <form
      className="user-form login"
      onSubmit={handleLogin}
    >
      <div className="inputs">
        <Input
          label="Username:"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Password:"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="action">
        <Input
          type="submit"
          name="login"
          value="Login"
          props={{ disabled: !isValid() }}
        />
      </div>
      {error && <div className="error"><p>{error}</p></div>}
      
    </form>
  )
}

export default Login
