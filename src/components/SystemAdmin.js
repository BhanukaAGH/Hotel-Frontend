import React, { useState } from 'react'
import AddNewUserForm from './AddNewUserForm'
import UserList from './UserList'

const SystemAdmin = () => {
  const [addNewUser, setAddNewUser] = useState(false)

  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
        System Admin
      </h1>

      <div className='w-full px-4 md:px-8 lg:px-16 py-4'>
        <div className='flex justify-end'>
          <button
            className='focus:outline-none lg:text-lg lg:font-medium focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 bg-gray-700 hover:bg-gray-800 rounded border border-gray-700 text-white text-sm px-4 py-1'
            onClick={() => setAddNewUser(true)}
          >
            Add New User
          </button>
        </div>
        <div className='mt-6'>
          <UserList />
        </div>
      </div>
      {addNewUser && <AddNewUserForm setAddNewUser={setAddNewUser} />}
    </div>
  )
}

export default SystemAdmin
