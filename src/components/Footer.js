import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logos/TechServ_SecondaryLogo_White.svg';
import NotesModal from './NotesModal';

const Footer = () => {
  const [showNotesModal, setShowNotesModal] = useState(false);

  const handleShowNotes = () => setShowNotesModal(true);
  const handleCloseNotes = () => setShowNotesModal(false);

  return (
    <>
      <footer className="footer bg-primary text-white text-center py-3 mt-4">
        {/* <img 
          src={logo} 
          alt="TechServ Logo" 
          style={{ height: '30px', marginBottom: '0px' }} 
        /> */}
        <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          Developed by <strong>Hunter Mooney</strong> | Powered by React
          <FontAwesomeIcon icon={faReact} className="ms-1" />
        </p>
        <p className="mt-1" style={{ fontSize: '0.9rem', marginBottom: '0' }}>
          Version 0.1.0 |
          <a href="https://github.com/your-repo-url" target="_blank" rel="noopener noreferrer" className="text-white">
            <FontAwesomeIcon icon={faGithub} className="ms-1" /> GitHub
          </a> |
          <span onClick={handleShowNotes} className="text-white" style={{ cursor: 'pointer' }}> Notes</span>
        </p>
      </footer>
      <NotesModal show={showNotesModal} handleClose={handleCloseNotes} />
    </>
  );
};

export default Footer;