import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 pb-6'>
          <p className='text-2xl font-extrabold leading-6 text-gray-800 text-center'>
            Create to your account
          </p>
          <div className='mt-6'>
            <label className='text-sm font-medium leading-none text-gray-800'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={name}
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              onChange={onChange}
            />
          </div>
          <div className='mt-6'>
            <label className='text-sm font-medium leading-none text-gray-800'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={email}
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              onChange={onChange}
            />
          </div>
          <div className='mt-6  w-full'>
            <label className='text-sm font-medium leading-none text-gray-800'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={password}
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              onChange={onChange}
            />
          </div>
          <div className='mt-6  w-full'>
            <label className='text-sm font-medium leading-none text-gray-800'>
              Re-Password
            </label>
            <input
              type='password'
              name='password2'
              value={password2}
              className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              onChange={onChange}
            />
          </div>
          <div className='mt-8'>
            <button
              className=' focus:ring-2 focus:ring-indigo-200 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full'
              onClick={(e) => onSubmit(e)}
            >
              Create your account
            </button>
          </div>
          <div className='mt-8 text-center'>
            <p className='text-sm mt-4 font-medium leading-none text-gray-500'>
              Do you have an account?
              <span
                className='text-sm font-medium leading-none underline text-gray-800 cursor-pointer pl-2'
                onClick={() => navigate('/login')}
              >
                Sign in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
