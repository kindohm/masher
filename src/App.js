import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import SceneContainer from './SceneContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scene: 'scene1' };
  }

  handleMouseDown() {
    this.setState({
      scene:
        this.state.scene === 'scene1'
          ? 'scene2'
          : this.state.scene === 'scene2'
          ? 'scene3'
          : 'scene1'
    });
  }

  render() {
    return (
      <div onMouseDown={this.handleMouseDown.bind(this)}>
        <P5Wrapper sketch={SceneContainer} scene={this.state.scene} />
      </div>
    );
  }
}

export default App;
