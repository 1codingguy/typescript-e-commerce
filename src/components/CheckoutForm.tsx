import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context'
import { formatPrice } from '../utils/helpers'
import { useHistory } from 'react-router-dom'

export const CheckoutForm = () => {
  const { cart, totalAmount, clearCart } = useCartContext()

  const [succeeded, setSucceeded] = useState(false) // if the payment succeeded
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false) // if the payment is processing
  const [disabled, setDisabled] = useState(false) // disable the pay button
  const [clientSecret, setClientSecret] = useState('') // client_secret returned from Netlify function

  const stripe = useStripe() 
  const elements = useElements()

  // push to successful payment page
  const history = useHistory()

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ cart, totalAmount })
      )
      console.log(data)

      setClientSecret(data.clientSecret)
    } catch (error) {
      console.log(error)
    }
  }

  // send cart, totalAmount to netlify function when component mounts
  useEffect(() => {
    createPaymentIntent()
    // eslint-disable-next-line
  }, [])

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  // const BillingDetails = {
  //   name: 'test',
  //   email: 'test_email@test.com'
  // }


  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)

    const cardElement = elements?.getElement(CardElement)

    if (cardElement) {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          // billing_details: BillingDetails,
        },
      })

      console.log(payload)

      if (payload && payload.error) {
        setError(`Payment failed `)
        // console.log(payload)
        setProcessing(false)
      } else {
        setError('')
        setProcessing(false)
        setSucceeded(true)
        // re-route to successful payment page
        history.push('/successful_payment')
        // clearCart()
      }
    }
  }

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>thank you</h4>
          <h4>payment was successful</h4>
          <h4>back to products</h4>
        </article>
      ) : (
        <article>
          <p>total amount to pay is </p>
          <h4>{formatPrice(totalAmount)}</h4>
          <p>test card number 4242 4242 4242 4242</p>
        </article>
      )}

      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
      </form>
      <button
        disabled={processing || disabled || succeeded || !CardElement}
        type='button'
        onClick={event => handleSubmit(event)}
      >
        <span id='button-text'>
          {processing ? <div className='spinner' id='spinner' /> : 'Pay'}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error ?? (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your{' '}
        <a href='https://dashboard.stripe.com/test/payments'>
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again
      </p>
    </div>
  )
}
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}
