import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import CheckoutForm from '../components/CheckoutForm'
import axios from 'axios'

const stripePromise = loadStripe(
  'pk_test_51JUCpmH2JSYXOELancysVC7n2LcttRWJkh6sgpMA19ukxzGWyj61Nw5A7OwoGcQfMITgFvWxhs3ZAxo3YWIO6mGi00gmCSw097'
)

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('')

  const { reservation } = useSelector((state) => state.reservation)

  const getClientSecret = async () => {
    const response = await axios.post(
      'https://stripepayment-hotelapi.herokuapp.com/create-payment-intent',
      reservation
    )

    setClientSecret(response.data.clientSecret)
  }

  useEffect(() => {
    getClientSecret()
  }, [])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='h-screen flex justify-center items-center text-base font-sans'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment
