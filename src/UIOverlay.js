import React, { PureComponent } from 'react';
import UIOverlayButton from './UIOverlayButton';
import './styles/ui.css';

class UIOverlay extends PureComponent {
  // D----R--------YYYYYY
  state = {
    r: Math.floor(Math.random() * 192) + 63,
    g: Math.floor(Math.random() * 192) + 63,
    b: Math.floor(Math.random() * 192) + 63,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.colorChange);
  }

  colorChange = () => {
    this.setState({
      r: Math.floor(Math.random() * 192) + 63,
      g: Math.floor(Math.random() * 192) + 63,
      b: Math.floor(Math.random() * 192) + 63,
    });
  }

  render() {
    const color = `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, 1)`;

    return (
      <div
        className="ui-overlay--container"
        style={{color: color}}
      >
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
      </div>
    );
  }
}

export default UIOverlay;
