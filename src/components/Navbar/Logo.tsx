import React from 'react'
import logo from '../../assets/logo_word.jpg'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} alt='cute buddy' />
    </Link>
  )
}
