import React from 'react';
import DataProcessor from './DataProcessor';
import Header from './components/Header';
import Footer from './components/Footer';
import Warning from './components/Warning';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Warning message="This application is currently in development. Use with discretion." />
      
      {/* Main content area */}
      <div className="">
        <div className="container-fluid" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <DataProcessor />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
