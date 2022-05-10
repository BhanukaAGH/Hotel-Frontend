import axios from 'axios'

const API_URL = 'http://192.168.56.1:8280/users'

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}`, config)

  return response.data.users
}

const userService = {
  getAllUsers,
}

export default userService
