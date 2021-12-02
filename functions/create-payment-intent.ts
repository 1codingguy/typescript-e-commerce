//[domain]/.netlify/functions/create-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  // if there's event.body object then it's a POST request, otherwise it's a GET request
  if (event.body) {
    const { cart, totalAmount } = JSON.parse(event.body)

    // take the advice of calculating total amount on server instead of on client
    // but not sure how to test the result for now

    const calculateTotal = cart => {
      return cart.reduce((total, cartItem) => {
        const { price, amount } = cartItem
        total.totalAmount += amount * price
        return total
      }, 0)
    }

    try {
      // console.log(calculateTotal(cart))

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'thb',
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  } else {
    return {
      statusCode: 200,
      body: 'create-payment-intent',
    }
  }
}
