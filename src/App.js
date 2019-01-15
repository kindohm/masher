import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Scene3 from './Scene3';

class App extends Component {
  render() {
    return <P5Wrapper sketch={Scene3} />;
  }
}

export default App;
