import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewRoom } from '../features/ui/uiSlice'
import { toast } from 'react-toastify'
import axios from 'axios'
import Spinner from './Spinner'

const HotelLists = ({ setUpdateHotel }) => {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)
  const { refresh } = useSelector((state) => state.ui)

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          'http://192.168.56.1:8280/hotel/getall'
        )
        setRooms(
          response?.data?.reservationDetails.filter(
            (room) => room.userId === userData.user.userId
          )
        )
      } catch (error) {
        toast(error.response.data.msg || error.message, { type: 'error' })
      }
    }
    setIsLoading(true)
    getRooms()
    setIsLoading(false)
  }, [refresh])

  const removeRoom = async (hotelId) => {
    try {
      await axios.delete(`http://192.168.56.1:8280/hotel/${hotelId}`)
      toast('Successfully remove hotel room', { type: 'success' })
      dispatch(addNewRoom())
    } catch (error) {
      toast(error.response.data.msg || error.message, { type: 'success' })
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {rooms.length === 0 && (
        <p className='text-xl md:text-2xl text-center font-semibold py-4'>
          No Any Rooms...
        </p>
      )}
      {rooms.length > 0 && (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Index</th>
                <th className='px-6 py-3'>Hotel Name</th>
                <th className='px-6 py-3'>Price</th>
                <th className='px-6 py-3'>RoomType</th>
                <th className='px-6 py-3'>PrePayment</th>
                <th className='px-6 py-3'>Status</th>
                {rooms && <th className='px-6 py-3'></th>}
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room, index) => (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={index}
                  >
                    <th className='px-6 py-4'>{index + 1}</th>
                    <td className='px-6 py-4'>{room.hotelName}</td>
                    <td className='px-6 py-4'>{room.price}</td>
                    <td className='px-6 py-4'>{room.roomType}</td>
                    <td className='px-6 py-4'>{room.prePaymentAmount}</td>
                    <td className='px-6 py-4'>{room.status}</td>
                    <td className='px-6 py-4 space-x-3'>
                      <span
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
                        onClick={() => setUpdateHotel(room)}
                      >
                        update
                      </span>
                      <span
                        className='font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer'
                        onClick={() => removeRoom(room._id)}
                      >
                        remove
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default HotelLists
