import React from 'react'
import { BooksProvider, useAuth } from './context'
import Books from './books/Books'
import LoginWrap from './login/LoginWrap'

const App = () => {
  const { user } = useAuth()

  const renderApp = () => {
    if (!user) return <LoginWrap />

    return (
      <BooksProvider>
        <Books />
      </BooksProvider>
    )
  }

  return (
    <div className="app">{renderApp()}
    </div>
  )
}

export default App
