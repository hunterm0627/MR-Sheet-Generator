import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="text-center mt-4">
    <Spinner
      animation="border"
      variant="primary"
      role="status"
      style={{ width: '4rem', height: '4rem', borderWidth: '0.5rem' }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
