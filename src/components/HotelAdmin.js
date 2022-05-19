import React, { useState } from 'react'
import HotelForm from './HotelForm'
import HotelLists from './HotelLists'
import UpdateHotelForm from './UpdateHotelForm'

const HotelAdmin = () => {
  const [createHotel, setCreateHotel] = useState(false)
  const [updateHotel, setUpdateHotel] = useState(null)

  return (
    <div className='w-full'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-7 md:leading-10'>
        Hotel Admin
      </h1>
      <div className='flex items-center justify-end px-8 mb-4 xl:px-16'>
        <button
          className='px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
          onClick={() => setCreateHotel(!createHotel)}
        >
          Create Hotel Room
        </button>
      </div>

      {createHotel && <HotelForm setCreateHotel={setCreateHotel} />}

      {updateHotel && (
        <UpdateHotelForm
          updateHotel={updateHotel}
          setUpdateHotel={setUpdateHotel}
        />
      )}

      <div className='px-8 xl:px-16'>
        <HotelLists setUpdateHotel={setUpdateHotel} />
      </div>
    </div>
  )
}

export default HotelAdmin
