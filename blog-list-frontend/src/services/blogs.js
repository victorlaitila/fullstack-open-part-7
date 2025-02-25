import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const deleteById = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (newBlog) => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

const addComment = async ({ id, content }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return response.data
}

export default { setToken, getAll, create, deleteById, update, addComment }