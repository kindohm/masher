import React from 'react'
import LogoImage from './images/logo.png'

import './styles/logo.css'

const Logo = () => {
  return (
    <div className="logo--container">
      <a href="http://shop.conditional.club/album/meme-booth" target="_blank" rel="noopener noreferrer">
        <img src={LogoImage} alt="Conditional" />
      </a>
    </div>
  )
}

export default Logo
