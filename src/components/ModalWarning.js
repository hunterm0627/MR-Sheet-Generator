import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalWarning = ({ show, onHide, emptyScidRows }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Empty SCID Warning</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      The CSV file contains the following rows with empty SCID values:
      <ul>
        {emptyScidRows.map((row, index) => (
          <li key={index}>Row {row}</li>
        ))}
      </ul>
      These rows were skipped.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default ModalWarning;
