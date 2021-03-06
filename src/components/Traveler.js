import React from 'react'
import { useSelector } from 'react-redux'
import ReservationForm from './ReservationForm'
import RoomsTable from './RoomsTable'

const Traveler = () => {
  const { availability } = useSelector((state) => state.reservation)
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
