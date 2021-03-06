import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  DELETE,
  UPDATE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes"

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      }
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post
        }),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload
        }),
      }
    default:
      return state
  }
}
export default reducer
