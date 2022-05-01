import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <RotatingLines width='60' strokeColor='#6495ED' />
    </div>
  )
}

export default Spinner
