import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import Traveler from '../components/Traveler'
import HotelAdmin from '../components/HotelAdmin'
import SystemAdmin from '../components/SystemAdmin'
import ReservationsSidebar from '../components/ReservationsSidebar'
import TaxiForm from '../components/TaxiForm'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [bookTaxi, setBookTaxi] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)

  return (
    <div className='bg-gray-100 h-screen overflow-hidden flex flex-col'>
      <nav className='w-full border-b py-1 md:py-2 sticky top-0 bg-gray-100 z-10'>
        <div className='py-0 container mx-auto px-3 sm:px-6 flex items-center justify-between'>
          <div aria-label='Home. logo' role='img'>
            <img
              className='w-24 md:w-28'
              src='https://seekvectorlogo.com/wp-content/uploads/2018/09/hotels-com-vector-logo.png'
              alt='logo'
            />
          </div>
          <div className='flex space-x-1 sm:space-x-2'>
            {!userData && (
              <>
                {' '}
                <button
                  className='focus:outline-none lg:text-lg lg:font-medium focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 text-sm px-4 py-1'
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button
                  className='focus:outline-none lg:text-lg lg:font-medium focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-800 rounded border border-indigo-700 text-white text-sm px-4 py-1'
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
              </>
            )}
            {userData && (
              <>
                {userData.user.role === 'traveler' && (
                  <>
                    <button
                      className='lg:text-lg lg:font-medium focus:shadow-lg  focus:outline-none focus:ring-0 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-800 rounded border border-indigo-700 text-white text-sm px-1 sm:px-4 py-1 transition duration-150 ease-in-out'
                      onClick={() => setBookTaxi(true)}
                    >
                      Book Taxi
                    </button>
                    <button
                      className='lg:text-lg lg:font-medium focus:shadow-lg  focus:outline-none focus:ring-0 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-800 rounded border border-indigo-700 text-white text-sm px-4 py-1 mr-2 transition duration-150 ease-in-out'
                      data-bs-toggle='offcanvas'
                      data-bs-target='#offcanvasRight'
                      aria-controls='offcanvasRight'
                      onClick={() => setOpen(!open)}
                    >
                      View my reservation
                    </button>
                  </>
                )}
                <button
                  className='focus:outline-none lg:text-lg lg:font-medium focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-800 rounded border border-indigo-700 text-white text-sm px-4 py-1'
                  onClick={() => dispatch(logout())}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className='bg-red-100 h-full py-6 overflow-y-auto relative'>
        <ReservationsSidebar open={open} />
        {bookTaxi && <TaxiForm setBookTaxi={setBookTaxi} />}
        {!userData && (
          <div className='flex items-center justify-center h-full'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
              Hotel Reservation System
            </h1>
          </div>
        )}
        {userData && userData.user.role === 'traveler' && <Traveler />}
        {userData && userData.user.role === 'hotel_admin' && <HotelAdmin />}
        {userData && userData.user.role === 'system_admin' && <SystemAdmin />}
      </main>
    </div>
  )
}

export default Home
