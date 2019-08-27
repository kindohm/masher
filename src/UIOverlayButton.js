import React from 'react';

const UIOverlayButton = ({ caption, color, content }) => {
  return (
    <div className="ui-overlay--button">
      <span className="ui-overlay--caption">{caption}</span>
      <div
        className="ui-overlay--box"
        style={{border: color}}
      >
        {content}
      </div>
    </div>
  )
}

export default UIOverlayButton;
