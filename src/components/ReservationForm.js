import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkAvailability,
  reset,
  temporaryReservation,
} from '../features/reservation/reservationSlice'
import DatePicker from 'react-datepicker'
import PhoneInput from 'react-phone-number-input'
import { Oval } from 'react-loader-spinner'

const ReservationForm = () => {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.reservation
  )
  const { userData } = useSelector((state) => state.auth)

  const checkAvailable = async (e) => {
    e.preventDefault()

    const temporaryReservationData = {
      userId: userData.user.userId,
      name,
      email,
      checkIn: startDate,
      checkOut: endDate,
      phoneNo: phoneNumber,
    }

    const availabilityData = {
      userId: userData.user.userId,
      checkIn: startDate,
      checkOut: endDate,
    }

    dispatch(checkAvailability(availabilityData))
    dispatch(temporaryReservation(temporaryReservationData))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch, isError, message, isSuccess])

  return (
    <div className='w-full flex justify-center px-4'>
      <div className='w-full md:w-1/2'>
        <form onSubmit={checkAvailable}>
          <div className='mb-2'>
            <label
              htmlFor='name'
              className='block mb-1 text-sm font-medium text-gray-900'
            >
              Your name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block w-full p-2.5 transition ease-in-out'
              placeholder='name'
            />
          </div>

          <div className='mb-2'>
            <label className='block mb-1 text-sm font-medium text-gray-900'>
              Check In
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText='Check In'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block w-full p-2.5 transition ease-in-out'
            />
          </div>

          <div className='mb-2'>
            <label className='block mb-1 text-sm font-medium text-gray-900'>
              Checkout
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText='Check Out'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block w-full p-2.5 transition ease-in-out'
            />
          </div>

          <div className='mb-2'>
            <label
              htmlFor='phone-number'
              className='block mb-1 text-sm font-medium text-gray-900'
            >
              Your phonenumber
            </label>
            <PhoneInput
              international
              defaultCountry='LK'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={setPhoneNumber}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block w-full p-2.5 transition ease-in-out'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block mb-1 text-sm font-medium text-gray-900'
            >
              Your email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none block w-full p-2.5 transition ease-in-out'
              placeholder='name@flowbite.com'
            />
          </div>

          <button
            type='submit'
            className='text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center flex items-center justify-center'
          >
            {!isLoading ? (
              'Check Availability'
            ) : (
              <Oval
                ariaLabel='loading-indicator'
                height={28}
                width={28}
                strokeWidth={5}
                color='white'
              />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReservationForm
