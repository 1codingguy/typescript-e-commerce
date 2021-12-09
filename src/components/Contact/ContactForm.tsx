import React from 'react'

export const ContactForm = () => {
  return (
    <form className='contact-form'>
      <input type='email' className='form-input' placeholder='enter email' />
      <button type='submit' className='submit-btn'>
        subscribe
      </button>
    </form>
  )
}
