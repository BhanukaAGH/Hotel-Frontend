import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  makeReservation,
  reset,
} from '../features/reservation/reservationSlice'
import { createEmailMessage } from '../utils/emailMessage'
import { createSMSMessage } from '../utils/smsMessage'
import Spinner from '../components/Spinner'

const Loading = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isError, message } = useSelector((state) => state.reservation)
  const urlParams = new URLSearchParams(window.location.search)
  var status = urlParams.get('redirect_status')

  useEffect(() => {
    const reservationData = JSON.parse(localStorage.getItem('reservation'))
    if (reservationData) {
      const email = createEmailMessage(reservationData)
      const emailData = {
        to: reservationData.email,
        subject: 'Reservation Information',
        message: email,
      }
      const sms = createSMSMessage(reservationData)
      const smsData = {
        phoneNumber: reservationData.phoneNo,
        message: sms,
      }
      dispatch(makeReservation(reservationData))

      const userNotify = async (emailData, smsData) => {
        await axios.post('/send-email', emailData)
        await axios.post('/send-sms', smsData)
        toast.success('Payment succeeded!')
        toast.success('Success! Your reservation.')
        localStorage.setItem('reservation', null)
        navigate('/', { replace: true })
      }
      userNotify(emailData, smsData)
    }
  }, [status])

  useEffect(() => {
    if (isError && message) {
      toast.error(message)
    }

    dispatch(reset)
  }, [isError, message, dispatch])

  return <Spinner />
}

export default Loading
