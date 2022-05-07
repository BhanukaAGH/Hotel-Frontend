import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllUsers } from '../features/user/userSlice'
import Spinner from './Spinner'

const UserList = () => {
  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  )

  const { addUser } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [addUser, dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Index</th>
            <th className='px-6 py-3'>Name</th>
            <th className='px-6 py-3'>Email</th>
            <th className='px-6 py-3'>UserRole</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                key={index}
              >
                <th className='px-6 py-4'>{index + 1}</th>
                <td className='px-6 py-4'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
