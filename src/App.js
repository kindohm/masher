import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Scene1 from './Scene1';

class App extends Component {
  render() {
    return <P5Wrapper sketch={Scene1} />;
  }
}

export default App;
