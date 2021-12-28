import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context'
import { formatPrice } from '../utils/helpers'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

// Billing info and style from Stripe YouTube tutorial
import Row from './Row'
import BillingDetailsFields from './BillingDetailsFields'

export const CheckoutForm = () => {
  const { cart } = useCartContext()
  const [succeeded, setSucceeded] = useState(false) // if the payment succeeded
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false) // if the payment is processing
  const [disabled, setDisabled] = useState(false) // disable the pay button
  const [clientSecret, setClientSecret] = useState('') // client_secret returned from Netlify function

  // display the payable amount returned from server 
  const [totalAmountFromServer, setTotalAmountFromServer] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  // push to successful payment page
  const history = useHistory()

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ cart })
      )
            
      setClientSecret(data.clientSecret)
      setTotalAmountFromServer(data.amount)
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

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value,
      },
    }

    const cardElement = elements?.getElement(CardElement)

    if (cardElement) {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      })


      if (payload && payload.error) {
        setError(`Payment failed `)
        setProcessing(false)
      } else {
        setError('')
        setProcessing(false)
        setSucceeded(true)
        // re-route to successful payment page
        history.push('/successful_payment')
      }
    }
  }

  return (
    <Wrapper>
      <form id='payment-form' onSubmit={handleSubmit}>
        <h4>enter billing details:</h4>
        <Row>
          <BillingDetailsFields />
        </Row>

        <h4>card details for test:</h4>
        <TestCardDetails>
          <li>Card number: 4242 4242 4242 4242</li>
          <li>MM/YY: 22/22</li>
          <li>CVC: 222</li>
        </TestCardDetails>

        <Row>
          <CardElement
            id='card-element'
            options={cardStyle}
            onChange={handleChange}
          />
        </Row>

        {/* Show any error that happens when processing the payment */}
        {error ?? (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}

        <Row>
          <button
            disabled={processing || disabled || succeeded || !CardElement}
            type='submit'
          >
            <span id='button-text'>
              {processing ? (
                <div className='spinner' id='spinner' />
              ) : (
                `Pay ${formatPrice(totalAmountFromServer/ 100)}`
              )}
            </span>
          </button>
        </Row>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1rem auto;
`

const TestCardDetails = styled.ul`
  color: var(--clr-primary-7);
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
  hidePostalCode: true,
}
