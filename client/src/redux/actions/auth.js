import * as api from "../../api"
import { AUTH } from "../constants/actionTypes"

// Action Creators
export const signup = (formData, history) => async (dispatch) => {
  try {
    // const { data } = await api.fetchPosts()
    // dispatch({ type: AUTH, payload: data })
    history.push("/")
  } catch (error) {
    console.log(error.message)
  }
}

export const signin = (formData, history) => async (dispatch) => {
  try {
    // const { data } = await api.fetchPosts()
    // dispatch({ type: AUTH, payload: data })
    history.push("/")
  } catch (error) {
    console.log(error.message)
  }
}
