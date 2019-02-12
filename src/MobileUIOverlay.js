import React, { PureComponent } from 'react';
import './styles/ui.css';

export default class MobileUIOverlay extends PureComponent {
  state = {
    touchedForTheVeryFirstTime: false,
  }

  handleFirstClick = () => {
    this.setState({ touchedForTheVeryFirstTime: true });
  }

  render() {
    return (
      <div
        className="mobile-ui--container"
        onClick={this.handleFirstClick}
        style={{ opacity: this.state.touchedForTheVeryFirstTime ? '0' : '1' }}
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
          <div className="row" onTouchStart={() => this.props.handleTouch('next')}>
            NEXT
          </div>
        </div>
      </div>
    );
  }
}
