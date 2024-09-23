import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/FileUpload.css';

const FileUpload = ({ title, accept, onFileUpload, fileName, loaded }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    onFileUpload(e.dataTransfer.files);
  };

  return (
    <div
      className={`file-upload-container ${loaded ? 'loaded' : ''} ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <div className="file-upload-content">
        <FontAwesomeIcon 
          icon={loaded ? faCheckCircle : faFileUpload} 
          size="3x" 
          className={`mb-3 ${loaded ? 'text-success' : 'text-primary'}`} 
        />
        <p className="upload-text">
          {loaded ? 'File uploaded successfully' : `Drag & Drop your ${title} file here, or click to upload`}
        </p>
        {fileName && <p className="file-name">{fileName}</p>}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => onFileUpload(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload;