import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'http://localhost:8004/api/reservation'

const makeReservation = async (reservationData) => {
  const response = await axios.post(`${API_URL}`, reservationData)
  return response.data
}

const getAllReservations = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`)
  return response.data.reservations
}

const cancelReservation = async (reservationId) => {
  const response = await axios.delete(`${API_URL}/${reservationId}`)
  return response.data
}

const checkAvailability = async (availabilityData) => {
  const response = await axios.post(
    `${API_URL}/check-availability`,
    availabilityData
  )

  if (!response.data.availability) {
    toast.error('Date Clashed')
  }

  return response.data.availability
}

const reservationService = {
  makeReservation,
  getAllReservations,
  cancelReservation,
  checkAvailability,
}

export default reservationService
