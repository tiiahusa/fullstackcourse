import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  console.log("Status on:", response.status)
  return response.status
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, update, remove }