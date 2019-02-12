import React, { PureComponent } from 'react';
import LogoImage from './images/logo.png';

import './styles/logo.css';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo--container">
        <a href="http://shop.conditional.club" target="_blank" rel="noopener noreferrer">
          <img src={LogoImage} alt="Conditional" />
        </a>
      </div>
    );
  }
}
