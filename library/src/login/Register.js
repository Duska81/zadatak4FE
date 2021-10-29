import React from 'react'
import { useAuth } from '../context'
import Input from '../form/Input'
import PasswordScore from './PasswordScore'

const Register = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmed, setConfirmed] = React.useState('')
  const [exists, setExists] = React.useState(true)
  const [passValid, setPassValid] = React.useState({
    uppercases: false,
    lowercases: false,
    digit: false,
    punct: false,
    length: false
  })

  const { register, error, usernameExists, setRegistering } = useAuth()

  const passwordScore = () => {
    const count = Object.keys(passValid).length
    let passed = 0
    for (let key in passValid) {
      if (passValid[key]) passed++
    }

    if (passed === 0) return 0
    return (passed / count) * 100
  }

  const isValid = () => {
    if (username === '') return false
    if (password === '') return false
    if (exists) return false
    if (confirmed !== password) return false
    if (passwordScore() < 60) return false

    return true
  }

  const handleRegister = async e => {
    e.preventDefault()
    if (isValid()) {
      await register(username, password)
      setRegistering(false)
    }
  }

  const checkUsername = async () => {
    if (username !== '')
      setExists(await usernameExists(username))
  }

  const checkPassword = e => {
    const { value } = e.target
    setPassValid(() => ({
      uppercases: /^(.*?[A-Z]){2,}/.test(value),
      lowercases: /^(.*?[a-z]){2,}/.test(value),
      digit: /^(?=.*\d)/.test(value),
      punct: /^(?=.*?[#?!@$%^&*-])/.test(value),
      _length: value.length > 11,
      get length() {
        return this._length
      },
      set length(value) {
        this._length = value
      },
    }))
  }

  return (
    <form
      className="user-form register"
      onSubmit={handleRegister}
    >
      <div className="inputs">
        <Input
          label="Username:"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onBlur={checkUsername}
        />
        <Input
          type="password"
          label="Password:"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyUp={checkPassword}
        />
        <PasswordScore score={passwordScore()} />
        <Input
          type="password"
          label="Confirm:"
          name="confirmed"
          value={confirmed}
          onChange={e => setConfirmed(e.target.value)}
        />
      </div>
      <div className="action">
        <Input
          type="submit"
          name="register"
          value="Register"
          props={{ disabled: !isValid() }}
          />
      </div>
      {error && <div className="error"><p>{error}</p></div>}
    </form>
  )
}

export default Register