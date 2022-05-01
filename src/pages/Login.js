import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || userData) {
      navigate('/')
    }

    dispatch(reset())
  }, [userData, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 pb-6'>
          <p className='text-2xl font-extrabold leading-6 text-gray-800 text-center'>
            Login to your account
          </p>
          <div className='mt-6'>
            <lable className='text-sm font-medium leading-none text-gray-800'>
              Email
            </lable>
            <input
              type='email'
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mt-6  w-full'>
            <lable className='text-sm font-medium leading-none text-gray-800'>
              Password
            </lable>
            <input
              type='password'
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mt-8'>
            <button
              className=' focus:ring-2 focus:ring-indigo-200 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full'
              onClick={(e) => onSubmit(e)}
            >
              Log in to account
            </button>
          </div>
          <div className='mt-8 text-center'>
            <p className='text-sm mt-4 font-medium leading-none text-gray-500'>
              Dont have account?
              <span
                className='text-sm font-medium leading-none underline text-gray-800 cursor-pointer pl-2'
                onClick={() => navigate('/register')}
              >
                Sign up here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
