import React, { PureComponent } from 'react';
import './styles/ui.css';

class UIOverlay extends PureComponent {
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
    return (
      <div
        className="ui-overlay--container"
        style={{color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, 1)`}}
      >
        KINDOHM
      </div>
    );
  }
}

export default UIOverlay;
