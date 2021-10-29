import React from 'react'
import { useBooks } from '../context'
import SelectedBook from './SelectedBook'
import BooksList from './BooksList'
import NewBook from './NewBook'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import Content from '../layout/Content'
import './Books.css'

const Books = () => {
  const { selected, adding, category } = useBooks()

  React.useEffect(() => {
    if (!!adding) {
      document.title = 'Library :: New book'
    } else {
      if (selected !== false) {
        document.title = `Library :: '${selected.title}'`
      } else {
        document.title = category === 'All' ? 'Library' : `Library :: browsing '${category}'`
      }
    }
  }, [category, selected, adding])

  const renderContent = () => {
    if (adding) return <NewBook />
    if (selected) return <SelectedBook />
    return <BooksList />
  }

  return (
    <div className="books-wrap">
      <Header />
      <Sidebar />
      <Content>{renderContent()}</Content>
    </div>
  )
}

export default Books
