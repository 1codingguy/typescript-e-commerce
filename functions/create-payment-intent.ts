//[domain]/.netlify/functions/create-payment-intent

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, totalAmount } = JSON.parse(event.body)

    console.log(cart)
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    }
  } else {
    return {
      statusCode: 200,
      body: 'create-payment-intent',
    }
  }
}
