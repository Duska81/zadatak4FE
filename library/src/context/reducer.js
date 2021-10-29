import {
  ADD_BOOK,
  REMOVE_BOOK,
  SELECT_BOOK,
  SET_BOOKS,
  SET_CATEGORY,
  SET_ERROR,
  TOGGLE_ADDING,
  TOGGLE_EDITING,
  UPDATE_BOOK,
  USER_LOGIN,
  USER_LOGOUT,
  TOGGLE_REGISTERING,
  NEXT_PAGE,
  PREV_PAGE,
  SET_PER_PAGE,
  SET_SEARCH,
} from './constants'
import * as storage from '../utils/storage'

export const initialAuthState = {
  user: storage.getUser(),
  error: false,
  registering: false
}

export const initialBooksState = {
  books: [],
  booksCount: 0,
  selected: false,
  error: false,
  adding: false,
  editing: false,
  category: 'All',
  page: 1,
  perPage: 10,
  maxPage: 1,
  search: ''
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        error: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: false,
        error: false
      }
    case TOGGLE_REGISTERING:
      return {
        ...state,
        registering: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const booksReducer = (state, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload.results,
        booksCount: action.payload.length,
        error: false,
        maxPage: Math.ceil(action.payload.length / state.perPage)
      }
    case ADD_BOOK:
      return {
        ...state,
        books: state.books.concat([action.payload]),
        booksCount: state.booksCount + 1,
        error: false
      }
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(b => b.id !== action.payload),
        booksCount: state.booksCount - 1,
        error: false
      }
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(b => b.id === action.payload.id ? action.payload : b),
        selected: action.payload,
        error: false
      }
    case SELECT_BOOK:
      const book = action.payload === false ? false :
        state.books.filter(b => b.id === action.payload)[0]
      return {
        ...state,
        selected: book,
        editing: false,
        error: false,
        search: book === false ? state.category !== 'All' ? state.category : '' : book.authors[0],
        perPage: book === false ? 10: 4,
        page: 1,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case TOGGLE_ADDING:
      return {
        ...state,
        adding: action.payload,
        selected: false,
        perPage: 10,
        search: state.category !== 'All' ? state.category : ''
      }
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: action.payload
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        page: 1,
        search: action.payload === 'All' ? '' : action.payload
      }
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
        page: 1
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        page: 1
      }
    default:
      return state
  }
}
