import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Scene2 from './Scene2';

class App extends Component {
  render() {
    return <P5Wrapper sketch={Scene2} />;
  }
}

export default App;
