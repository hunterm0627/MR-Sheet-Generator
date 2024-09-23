import React from 'react';
import { Toast } from 'react-bootstrap';

const SuccessToast = ({ showSuccess, onClose }) => (
  <Toast show={showSuccess} onClose={onClose} autohide delay={3000} className="position-fixed bottom-0 end-0 m-3">
    <Toast.Body>🎉 Success! Your file has been uploaded.</Toast.Body>
  </Toast>
);

export default SuccessToast;
