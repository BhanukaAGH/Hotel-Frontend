import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import Traveler from '../components/Traveler'
import HotelAdmin from '../components/HotelAdmin'
import SystemAdmin from '../components/SystemAdmin'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)

  return (
    <div className='bg-gray-100 h-screen flex flex-col'>
      <nav className='w-full border-b py-1 md:py-2'>
        <div className='py-0 container mx-auto px-6 flex items-center justify-between'>
          <div aria-label='Home. logo' role='img'>
            <img
              className='w-24 md:w-28'
              src='https://seekvectorlogo.com/wp-content/uploads/2018/09/hotels-com-vector-logo.png'
              alt='logo'
            />
          </div>
          <div className='flex space-x-2'>
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
              <button
                className='focus:outline-none lg:text-lg lg:font-medium focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-800 rounded border border-indigo-700 text-white text-sm px-4 py-1'
                onClick={() => dispatch(logout())}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className='bg-red-100 h-full'>
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
