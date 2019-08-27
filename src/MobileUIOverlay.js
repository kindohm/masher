import React, { useState } from 'react'
import './styles/ui.css'

const MobileUIOverlay = ({ handleTouch }) => {
  const [touched, setTouched] = useState(false)

  const handleFirstClick = () => {
    setTouched(true)
  }

  return (
    <div
      className="mobile-ui--container"
      onClick={handleFirstClick}
      style={{ opacity: touched ? '0' : '1' }}
    >
      <div className="mobile-ui--controls">
        <div className="row">
          <div className="zone">
            CHANGE
          </div>
          <div className="zone">
            CHANGE
          </div>
        </div>
        <div className="row">
          <div className="zone">
            BANG
          </div>
          <div className="zone">
            BANG
          </div>
        </div>
        <div className="row" onTouchStart={() => handleTouch('next')}>
          NEXT
        </div>
      </div>
    </div>
  )
}

export default MobileUIOverlay
