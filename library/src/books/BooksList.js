import React from 'react'
import { useBooks } from '../context'
import BookCard from './BookCard'
import BooksPagination from './BooksPagination'
import './BooksList.css'

const BooksList = () => {
  const {
    books,
    fetchBooks,
    searchBooks,
    category,
    page,
    perPage,
    search,
  } = useBooks()

  React.useEffect(() => {
    if (search !== '') {
      searchBooks()
    } else {
      fetchBooks()
    }
    // eslint-disable-next-line
  }, [search, category, page, perPage])

  return (
    <>
      <BooksPagination />
      <div className="books-list">
        {books.map(book =>
          <BookCard
            key={book.id}
            book={book}
          />)}
      </div>
    </>
  )
}

export default BooksList
