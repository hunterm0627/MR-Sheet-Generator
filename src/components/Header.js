import React from 'react';
import logo from '../assets/logos/TechServ_logo.jpg';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="custom-header">
      <div className="header-content">
        <img src={logo} alt="TechServ Logo" className="header-logo" />
        <h1 className="header-title">Make Ready Sheet Generator</h1>
      </div>
    </header>
  );
};

export default Header;
