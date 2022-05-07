import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1/user'

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
