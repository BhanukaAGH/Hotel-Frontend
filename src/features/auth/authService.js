import axios from 'axios'

const API_URL = 'http://192.168.56.1:8280/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// add new user -system admin
const addNewUser = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)
  return response.data
}

const authService = {
  register,
  logout,
  login,
  addNewUser,
}

export default authService
