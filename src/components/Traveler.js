import React from 'react'
import ReservationForm from './ReservationForm'

const Traveler = () => {
  return (
    <div className='h-full w-full'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
        Traveler
      </h1>

      <ReservationForm />
    </div>
  )
}

export default Traveler
