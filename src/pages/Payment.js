import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(
  'pk_test_51JUCpmH2JSYXOELancysVC7n2LcttRWJkh6sgpMA19ukxzGWyj61Nw5A7OwoGcQfMITgFvWxhs3ZAxo3YWIO6mGi00gmCSw097'
)

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('http://localhost:8001/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
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
