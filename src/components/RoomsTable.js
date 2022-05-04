import React from 'react'

const RoomsTable = () => {
  return (
    <div className='relative overflow-x-auto px-4 md:px-8 lg:px-16'>
      <table className='w-full lg:w-5/6 text-sm text-left text-gray-400 shadow-md mx-auto'>
        <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Hotel name</th>
            <th className='px-6 py-3'>Room Type</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Pre-Payment</th>
            <th className='px-6 py-3'>Location</th>
            <th className='px-6 py-3'>Book</th>
          </tr>
        </thead>
        <tbody>
          <tr className=' border-b bg-gray-800 border-gray-700'>
            <th className='px-6 py-4 font-medium text-white whitespace-nowrap'>
              Hotel Name 01
            </th>
            <td className='px-6 py-4'>Type 1</td>
            <td className='px-6 py-4'>50000.00</td>
            <td className='px-6 py-4'>10000.00</td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                View
              </span>
            </td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                Book
              </span>
            </td>
          </tr>
          <tr className='border-b bg-gray-800 border-gray-700'>
            <th className='px-6 py-4 font-medium text-white whitespace-nowrap'>
              Hotel Name 02
            </th>
            <td className='px-6 py-4'>Type 2</td>
            <td className='px-6 py-4'>30000.00</td>
            <td className='px-6 py-4'>no</td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                View
              </span>
            </td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                Book
              </span>
            </td>
          </tr>
          <tr className='bg-gray-800'>
            <th className='px-6 py-4 font-medium text-white whitespace-nowrap'>
              Hotel Name 03
            </th>
            <td className='px-6 py-4'>Type 3</td>
            <td className='px-6 py-4'>100000.00</td>
            <td className='px-6 py-4'>20000.00</td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                View
              </span>
            </td>
            <td className='px-6 py-4'>
              <span className='font-medium text-blue-500 cursor-pointer hover:underline'>
                Book
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoomsTable
