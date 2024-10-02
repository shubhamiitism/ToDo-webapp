import React from 'react';
import '../styles/CardHeader.css';

const CardHeader = ({ imagePath, title, length }) => (
  <div className="column-header">
    <div className="header-left">
      <img src={imagePath} alt={title} className="header-icon" />
      <span>{title}</span>
      <span style={{ color: 'grey' }}>{length}</span>
    </div>
    <div className="header-right">
      <img src="/images/icons/add.svg" alt="Add" className="header-right-icon" />
      <img src="/images/icons/3 dot menu.svg" alt="Menu" className="header-right-icon" />
    </div>
  </div>
);

export default CardHeader;
