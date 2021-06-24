import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })
// const token = JSON.parse(localStorage.getItem("profile")).token
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req
})

export const fetchPosts = () => API.get("/posts")

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  )

export const createPost = (newPost) => API.post("/posts", newPost)

export const updatePost = (id, updatePost) => API.patch("/posts", updatePost)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signin = (formData) => API.post("/user/signin", formData)

export const signup = (formData) => API.post("/user/signup", formData)
