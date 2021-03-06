import React, { useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllReservations,
  cancelReservation,
  reset,
} from '../features/reservation/reservationSlice'
import moment from 'moment'

const ReservationsSidebar = ({ open }) => {
  const dispatch = useDispatch()
  const { reservations, isSuccess } = useSelector((state) => state.reservation)

  const canceled = (reservationId) => {
    dispatch(cancelReservation(reservationId))
  }

  useEffect(() => {
    dispatch(getAllReservations())
    dispatch(reset())
  }, [dispatch, isSuccess, open])

  return (
    <div
      className='offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-gray-800 invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96'
      tabIndex='-1'
      id='offcanvasRight'
      aria-labelledby='offcanvasRightLabel'
    >
      <div className='offcanvas-header flex items-center justify-between p-4'>
        <div className='text-lg text-white font-sans font-medium'>
          Your Reservations
        </div>
        <button
          type='button'
          className='btn-close box-content w-4 h-4 p-2 text-xl text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-100'
          data-bs-dismiss='offcanvas'
          aria-label='Close'
        >
          <MdClose />
        </button>
      </div>
      <div className='offcanvas-body flex-grow p-2 overflow-y-auto space-y-2'>
        {reservations &&
          reservations.map((reservation) => (
            <div
              className='py-3 sm:py-4 bg-indigo-500 rounded px-2'
              key={reservation._id}
            >
              <div className='flex items-center space-x-4'>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate text-white'>
                    {reservation.hotelName}
                  </p>
                  <p className='text-sm truncate text-gray-200'>{`Check In - ${moment(
                    reservation.checkIn
                  ).format('YYYY/MM/DD')}`}</p>
                  <p className='text-sm truncate text-gray-200'>{`Check Out - ${moment(
                    reservation.checkOut
                  ).format('YYYY/MM/DD')}`}</p>
                </div>
                <button
                  className='inline-flex items-center text-lg font-semibold text-white hover:text-black'
                  onClick={() => canceled(reservation._id)}
                >
                  cancel
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ReservationsSidebar
