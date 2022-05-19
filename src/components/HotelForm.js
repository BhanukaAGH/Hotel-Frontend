import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewRoom } from '../features/ui/uiSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const HotelForm = ({ setCreateHotel }) => {
  const [formData, setFormData] = useState({
    hotelName: '',
    price: '',
    roomType: 'single',
    prePaymentAmount: '',
    longitude: '',
    latitude: '',
  })

  const { hotelName, price, roomType, prePaymentAmount, longitude, latitude } =
    formData

  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (hotelName && price && roomType) {
      formData.userId = userData.user.userId

      await axios.post('http://192.168.56.1:8280/hotel/create', formData)
      toast.success('Success! Add new Room.')
      dispatch(addNewRoom())
      setCreateHotel(false)
    } else {
      toast.error('Please provide all values.')
    }
  }

  return (
    <div className='absolute inset-0 z-[5] min-w-full overflow-y-auto h-full'>
      <div className='relative flex h-full w-full items-center justify-center p-4'>
        <div className='absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity h-full'></div>

        <div className=' w-full transform overflow-hidden rounded-lg  bg-white shadow-xl transition-all sm:my-8 sm:max-w-lg'>
          <div className='relative rounded-lg bg-white shadow'>
            <button
              type='button'
              className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={() => setCreateHotel(false)}
            >
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900'>
                Add new Room
              </h3>
              <form className='space-y-6' onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor='hotelName'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Hotel name
                  </label>
                  <input
                    type='text'
                    name='hotelName'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='hotel name'
                    value={hotelName}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Price
                  </label>
                  <input
                    type='number'
                    name='price'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='room price'
                    value={price}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='roomType'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Select an Room Type
                  </label>
                  <select
                    id='roomType'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    name='roomType'
                    value={roomType}
                    onChange={onChange}
                  >
                    <option defaultValue={'single'}>Single</option>
                    <option value='double'>Double</option>
                    <option value='triple'>Triple</option>
                    <option value='quad'>Quad</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='prePaymentAmount'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    PrePayment Amount
                  </label>
                  <input
                    type='number'
                    name='prePaymentAmount'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='prepayment amount'
                    value={prePaymentAmount}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor='location'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Location
                  </label>
                  <div className='flex w-full space-x-4'>
                    <input
                      type='number'
                      name='longitude'
                      className='w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      placeholder='longitude'
                      value={longitude}
                      onChange={onChange}
                    />
                    <input
                      type='number'
                      name='latitude'
                      className='w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      placeholder='latitude'
                      value={latitude}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                  Book Taxi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelForm
