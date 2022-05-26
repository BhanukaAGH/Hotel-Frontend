import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import styles from './CheckoutForm.module.css'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { reservation } = useSelector((state) => state.reservation)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded': {
          setMessage('Payment succeeded!')
          break
        }
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    localStorage.setItem('reservation', JSON.stringify(reservation))

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/loading',
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    setIsLoading(false)
  }

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className={styles.stripeForm}
    >
      <PaymentElement className={styles.paymentElement} />
      <button
        disabled={isLoading || !stripe || !elements}
        id='submit'
        className={styles.stripeButton}
      >
        <span id='button-text'>
          {isLoading ? (
            <div className={styles.stripeSpinner} id='spinner'></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>

      {message && (
        <div className={styles.paymentMessage}>
          <span>{message}</span>
        </div>
      )}
    </form>
  )
}

export default CheckoutForm
