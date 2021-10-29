import React from 'react'
import { useBooks } from '../context'
import Select from '../form/Select'
import Input from '../form/Input'

const BooksPagination = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const searchTimeout = React.useRef(null)

  const {
    selected,
    category,
    setSearch,
    page,
    perPage,
    maxPage,
    setPerPage,
    nextPage,
    prevPage,
  } = useBooks()

  const handleSearch = e => {
    const term = e.target.value
    setSearchTerm(term)
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => setSearch(term), 1000)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearch('')
  }

  return (
    <div className="books-pagination">
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={prevPage}
          className="prev"
        >
          Prev
        </button>
        Page: {page} from {maxPage}
        <button
          disabled={page === maxPage}
          onClick={nextPage}
          className="next"
        >
          Next
        </button>
      </div>
      {!selected && (
        <Select
          name="per_page"
          value={perPage}
          onChange={e => setPerPage(e.target.value)}
          className="per-page"
          options={[
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 25, value: 25 },
            { label: 30, value: 30 },
            { label: 50, value: 50 },
          ]}
        />
      )}
      {!selected && category === 'All' && (
        <div className="search-wrap">
          <Input
            value={searchTerm}
            onChange={handleSearch}
            props={{ placeholder: 'Nadji...' }}
          />
          <span onClick={clearSearch}>Obrisi</span>
        </div>
      )}
    </div>
  )
}

export default BooksPagination
