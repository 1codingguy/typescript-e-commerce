// to access this function on dev server with the following path
//[domain]/.netlify/functions/hello

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'hello world'
  }
}