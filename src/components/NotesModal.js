import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotesModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-4">
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          <img src="https://via.placeholder.com/600x300" alt="Placeholder" className="img-fluid mb-3" />
        </section>

        <section className="mb-4">
          <h2>Dolor Sit Amet</h2>
          <p>
            Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
          </p>
          <img src="https://via.placeholder.com/600x300" alt="Placeholder" className="img-fluid mb-3" />
        </section>

        <section>
          <h2>Consectetur Adipiscing</h2>
          <p>
            Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Integer molestie lorem at massa</li>
            <li>Facilisis in pretium nisl aliquet</li>
          </ul>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotesModal;