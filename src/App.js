import React, { useEffect, useState }  from 'react'
import P5Wrapper from 'react-p5-wrapper'
import SceneContainer from './SceneContainer'

import './styles/reset.css'

import UIOverlay from './UIOverlay'
import MobileUIOverlay from './MobileUIOverlay'
import Logo from './Logo'

const App = () => {
  const [scene, setScene] = useState('scene1')

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => { document.removeEventListener('keydown', handleKeyDown) }
  })

  const handleKeyDown = event => {
    if (event.keyCode === 32) {
      const newScene =
        scene === 'scene1'
          ? 'scene2'
          : scene === 'scene2'
          ? 'scene3'
          : 'scene1'

      setScene(newScene)
    }
  }

  const handleTouch = (event) => {
    if (event === 'next') {
      const newScene =
        scene === 'scene1'
          ? 'scene2'
          : scene === 'scene2'
          ? 'scene3'
          : 'scene1';

      setScene(newScene)
    }
  }

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown}>
      <P5Wrapper sketch={SceneContainer} scene={scene} />
      <MobileUIOverlay handleTouch={handleTouch} />
      <Logo />
      <UIOverlay />
    </div>
  )
}

export default App
