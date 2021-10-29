import React from 'react'
import { useAuth, useBooks } from '../context'

const BookCard = ({ book }) => {
  const { isAdmin } = useAuth()
  const { selectBook, removeBook } = useBooks()
  const dateArr = book.publishDate.split('-')
  const year = dateArr[0]
  let rating = []
  for (let i = 0; i < Math.round(book.rating); i++) {
    rating.push(<span key={`star_${i}`}>☆</span>)
  }

  const handleSelect = () => selectBook(book.id)

  const handleRemove = () => {
    if (window.confirm(`Remove ${book.title}`))
      removeBook(book.id)
  }

  return (
    <div className="book-card">
      <div className="content">
        <div className="title">
          <p className="book-title">{book.title}</p>
          <p className="book-authors">{book.authors.join(', ')}</p>
          <p className="book-year">{year} <small>{book.genre}</small></p>
        </div>
        <div className="footer">
          <div className="rating">{rating}</div>
          <div className="action">
            <button className="select" onClick={handleSelect}>Info</button>
            {isAdmin() && <button className="remove" onClick={handleRemove}>{"\uD83D\uDDD1"}</button>}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
