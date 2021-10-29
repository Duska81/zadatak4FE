import React from 'react'
import { useAuth, useBooks } from '../context'
import './Header.css'

const Header = () => {
  const { isAdmin } = useAuth()
  const {
    setAdding,
    adding,
    setEditing,
    editing,
    selected,
    selectBook,
    category
  } = useBooks()

  return (
    <header className="header">
      <div className="brand">
        <h1>Library {category !== 'All' && <small><i> :: Category: {category}</i></small>}</h1>
      </div>

      <div className="action">
        {isAdmin() && !adding && <button onClick={() => setAdding(true)}>New Book</button>}
        {adding && <button onClick={() => setAdding(false)}>Back</button>}
        {isAdmin() && selected && <button onClick={() => setEditing(!editing)}>{editing ? 'Discard' : 'Edit'}</button>}
        {selected && <button onClick={() => selectBook(false)}>Back</button>}
      </div>
    </header>
  )
}

export default Header
