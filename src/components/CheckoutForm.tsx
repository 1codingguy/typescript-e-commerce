import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context'
import { formatPrice } from '../utils/helpers'
import { useHistory } from 'react-router-dom'
import styled from "styled-components"

// Billing info and style from Stripe YouTube tutorial
import Row from './Row'
import FormField from './FormField'
import BillingDetailsFields from './BillingDetailsFields'

export const CheckoutForm = () => {
  const { cart, totalAmount } = useCartContext()

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

    console.log(event)

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
    <Wrapper>
      <h4>please enter your billing details:</h4>
      <Row>
        <BillingDetailsFields />
      </Row>

      <h4>please enter your card details:</h4>
      <Row>
        <form id='payment-form' onSubmit={handleSubmit}>
          <CardElement
            id='card-element'
            options={cardStyle}
            onChange={handleChange}
          />
        </form>
      </Row>

      <Row>
        <button
          disabled={processing || disabled || succeeded || !CardElement}
          type='button'
          onClick={event => handleSubmit(event)}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner' /> : 'Pay'}
          </span>
        </button>
      </Row>

      {/* Show any error that happens when processing the payment */}
      {error ?? (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}

    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 1rem;
`

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
