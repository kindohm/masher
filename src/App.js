import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import SceneContainer from './SceneContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scene: 'scene1' };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode === 32) {
      const currentScene = this.state.scene;
      const newScene =
        currentScene === 'scene1'
          ? 'scene2'
          : currentScene === 'scene2'
          ? 'scene3'
          : 'scene1';
      this.setState({ scene: newScene });
    }
  }

  render() {
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown}>
        <P5Wrapper sketch={SceneContainer} scene={this.state.scene} />
      </div>
    );
  }
}

export default App;
