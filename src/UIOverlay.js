import React, { useEffect, useState } from 'react'
import UIOverlayButton from './UIOverlayButton'
import './styles/ui.css'

const makeAColor = () => {
  return Math.floor(Math.random() * 192) + 63
}

const UIOverlay = () => {
  const [red, setRed] = useState(makeAColor())
  const [green, setGreen] = useState(makeAColor())
  const [blue, setBlue] = useState(makeAColor())

  useEffect(() => {
    document.addEventListener('keydown', colorChange)

    return () => { document.removeEventListener('keydown', colorChange) }
  })

  const colorChange = () => {
    setRed(makeAColor())
    setBlue(makeAColor())
    setGreen(makeAColor())
  }

  const color = `rgba(${red}, ${blue}, ${green}, 1)`

  return (
    <div className="ui-overlay--container ui-overlay--active" style={{ color: color }}>
      <UIOverlayButton
        caption="BANG"
        content="D"
        color={`1px solid ${color}`}
      />

      <UIOverlayButton
        caption="BANG"
        content="F"
        color={`1px solid ${color}`}
      />

      <UIOverlayButton
        caption="CHANGE"
        content="E"
        color={`1px solid ${color}`}
      />

      <UIOverlayButton
        caption="CHANGE"
        content="R"
        color={`1px solid ${color}`}
      />

      <UIOverlayButton
        caption="NEXT"
        content="SPACE"
        color={`1px solid ${color}`}
      />

      <h1>KINDOHM</h1>
      <h2>MEME BOOTH</h2>
    </div>
  )
}

export default UIOverlay;
