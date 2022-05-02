import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </>
  )
}

export default App
