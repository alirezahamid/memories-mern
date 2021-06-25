import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  DELETE,
  UPDATE,
} from "../constants/actionTypes"

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case FETCH_BY_SEARCH:
      return action.payload
    case CREATE:
      return [...posts, action.payload]
    case UPDATE:
      return posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post
      })
    case DELETE:
      return posts.filter((post) => {
        return post._id !== action.payload
      })
    default:
      return posts
  }
}
export default reducer
