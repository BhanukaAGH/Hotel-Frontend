import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  makeReservation,
  temporaryReservation,
} from '../features/reservation/reservationSlice'
import { toast } from 'react-toastify'

const HotelTableRaw = ({ hotel }) => {
  const [roomCount, setRoomCount] = useState(1)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { reservation } = useSelector((state) => state.reservation)

  const bookHotel = (hotelData) => {
    const reservationData = {
      ...reservation,
      roomCount,
      roomType: hotelData.roomType,
      hotelName: hotelData.hotelName,
      prepaid: hotelData.prePaymentAmount,
    }

    if (hotelData.prePaymentAmount !== 0) {
      dispatch(temporaryReservation(reservationData))
      navigate('/payment')
    } else {
      dispatch(makeReservation(reservationData))
      toast.success('Success! You reservation.')
    }
  }

  return (
    <tr className=' border-b bg-gray-800 border-gray-700'>
      <th className='px-6 py-4 font-medium text-white whitespace-nowrap'>
        {hotel.hotelName}
      </th>
      <td className='px-6 py-4'>{hotel.roomType}</td>
      <td className='px-6 py-4'>{hotel.price}</td>
      <td className='px-6 py-4'>{hotel.prePaymentAmount}</td>
      <td>
        <input
          type='text'
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
          className='w-10 h-full text-center focus:outline-none bg-transparent'
        />
      </td>
      <td className='px-6 py-4'>
        <span
          className='font-medium text-blue-500 cursor-pointer hover:underline'
          onClick={() =>
            navigate(`/location/${hotel.longitude}/${hotel.latitude}`)
          }
        >
          View
        </span>
      </td>
      <td className='px-6 py-4'>
        <span
          className='font-medium text-blue-500 cursor-pointer hover:underline'
          onClick={() => bookHotel(hotel)}
        >
          Book
        </span>
      </td>
    </tr>
  )
}

export default HotelTableRaw
