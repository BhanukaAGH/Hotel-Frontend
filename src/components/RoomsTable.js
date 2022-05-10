import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HotelTableRaw from './HotelTableRaw'

const RoomsTable = () => {
  const [hotels, setHotels] = useState(null)

  const getAllHotels = async () => {
    const response = await axios.get('	http://192.168.56.1:8280/hotel/getall')
    setHotels(response.data.reservationDetails)
  }

  useEffect(() => {
    getAllHotels()
  }, [])

  return (
    <div className='relative overflow-x-auto px-4 md:px-8 lg:px-16'>
      <table className='w-full lg:w-5/6 text-sm text-left text-gray-400 shadow-md mx-auto'>
        <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Hotel name</th>
            <th className='px-6 py-3'>Room Type</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Pre-Payment</th>
            <th>Room Count</th>
            <th className='px-6 py-3'>Location</th>
            <th className='px-6 py-3'>Book</th>
          </tr>
        </thead>
        <tbody>
          {hotels &&
            hotels
              .filter((hotel) => hotel.status !== 'Book')
              .map((hotel) => <HotelTableRaw key={hotel._id} hotel={hotel} />)}
        </tbody>
      </table>
    </div>
  )
}

export default RoomsTable
