import React, { PureComponent } from 'react';

class UIOverlayButton extends PureComponent {
  render() {
    return (
      <div className="ui-overlay--button">
        <span className="ui-overlay--caption">{this.props.caption}</span>
        <div
          className="ui-overlay--box"
          style={{border: this.props.color}}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default UIOverlayButton;
