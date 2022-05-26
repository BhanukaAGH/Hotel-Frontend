import axios from 'axios'

const API_URL = '/users'

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data.users
}

const userService = {
  getAllUsers,
}

export default userService
