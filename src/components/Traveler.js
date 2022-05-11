import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  makeReservation,
  reset,
} from '../features/reservation/reservationSlice'
import ReservationForm from './ReservationForm'
import RoomsTable from './RoomsTable'
import { createEmailMessage } from '../utils/emailMessage'
import { createSMSMessage } from '../utils/smsMessage'

const Traveler = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { availability, isError, message } = useSelector(
    (state) => state.reservation
  )
  const urlParams = new URLSearchParams(window.location.search)
  var status = urlParams.get('redirect_status')

  useEffect(() => {
    const reservationData = JSON.parse(localStorage.getItem('reservation'))
    if (reservationData) {
      const email = createEmailMessage(reservationData)
      const emailData = {
        to: reservationData.email,
        subject: 'Reservation Information',
        email,
      }
      const sms = createSMSMessage(reservationData)
      const smsData = {
        phoneNumber: reservationData.phoneNo,
        message: sms,
      }
      dispatch(makeReservation(reservationData))
      axios.post('http://192.168.56.1:8280/send-email', emailData)
      axios.post('http://192.168.56.1:8280/send-sms', smsData)
      toast.success('Payment succeeded!')
      toast.success('Success! Your reservation.')
      localStorage.setItem('reservation', null)
      navigate('/', { replace: true })
    }
  }, [status])

  useEffect(() => {
    if (isError && message) {
      toast.error(message)
    }

    dispatch(reset)
  }, [isError, message, dispatch])

  return (
    <div className='w-full'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
        Traveler
      </h1>

      {!availability && <ReservationForm />}

      {availability && (
        <div className='mt-10'>
          <h3 className='text-2xl first-letter:text-center text-gray-800 font-bold leading-7 md:leading-10 text-center py-1'>
            Hotel Rooms
          </h3>
          <RoomsTable />
        </div>
      )}
    </div>
  )
}

export default Traveler
