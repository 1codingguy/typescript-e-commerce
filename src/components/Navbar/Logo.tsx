import React from 'react'
// import logo from '../../assets/logo_word.jpg'
import whiteLogo from '../../assets/logo_white.png'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'>
      <img src={whiteLogo} alt='cute buddy' />
    </Link>
  )
}
