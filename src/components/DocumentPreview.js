import React from 'react';
import Logo from '../assets/logos/PNMlogo-ColorPos.png';
import '../css/DocumentPreview.css';

const DocumentPreview = ({ name, constructionCoordinator, address, date, permitNumber }) => {
    const placeholderStyle = {
        color: '#999',
        fontStyle: 'italic'
    };

    const actualTextStyle = {
        color: '#000',
        fontStyle: 'normal'
    };

    const PlaceholderText = ({ children, actualText }) => (
        <span style={actualText ? actualTextStyle : placeholderStyle}>
            {actualText || children}
        </span>
    );

    return (
        <div className="document-preview shadow-md p-3 mb-5 bg-white rounded">
            <div className="document-header d-flex justify-content-between align-items-center">
                <img src={Logo} alt="Logo" className="logo-preview" />
            </div>
            <div className="document-content mt-3">
                <p className="date">Date: <PlaceholderText actualText={date}>MM/DD/YYYY</PlaceholderText></p>
                <p><strong>Name:</strong> <PlaceholderText actualText={name}>Name goes here</PlaceholderText></p>
                <p><strong>Construction Coordinator:</strong> <PlaceholderText actualText={constructionCoordinator}>Coordinator goes here</PlaceholderText></p>
                <p><strong>Subject:</strong> <PlaceholderText actualText={permitNumber}>Permit number goes here</PlaceholderText></p>
                <p><strong>Address:</strong> <PlaceholderText actualText={address}>Address goes here</PlaceholderText></p>

                <div className="dummy-text">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line short"></div>
                </div>
            </div>

            <div className="zigzag-bottom"></div>
            <div className="zigzag-shadow"></div>
        </div>
    );
};

export default DocumentPreview;