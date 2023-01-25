import axios from "axios";

const API = axios.create({
  baseURL: 'https://calm-plum-jaguar-tutu.cyclic.app/todos'
})

export const getTodos = async () => {
  const res = await API.get('/')
  return res.data.data
}

export const postTodo = async (data) => {
  const res = await API.post('/', data)
  return res.data
}

export const updateTodo = async ({ id, data }) => {
  const res = await API.put(`/${id}`, data)
  return res.data
}

export const deleteTodo = async (id) => {
  const res = await API.delete(`/${id}`)
  return res.data
}