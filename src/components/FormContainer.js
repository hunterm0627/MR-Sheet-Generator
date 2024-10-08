import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const FormContainer = ({
    name,
    setName,
    constructionCoordinator,
    setConstructionCoordinator,
    address,
    setAddress,
    handleCSVImport,
    handleJSONImport,
    csvFileName,
    jsonFileName,
    csvLoaded,
    jsonLoaded,
    engineer, // Capture engineer's name
    setEngineer, // Function to update engineer's name
}) => {
    return (
        <div className="border rounded p-3 mb-4">
            <form>
                <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="csvUpload" className="form-label me-2">Katapult Make Ready Summary CSV</label>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="csv-tooltip">
                                <div style={{ textAlign: 'center' }}>
                                    <img 
                                        src="https://via.placeholder.com/100"
                                        alt="Example CSV"
                                        style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                                    />
                                    <p>Get this CSV from Katapult under the "Exports" section.</p>
                                </div>
                            </Tooltip>
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="text-primary" style={{ cursor: 'pointer', marginRight: '10px' }} />
                    </OverlayTrigger>
                    <input
                        type="file"
                        className="form-control mt-2"
                        id="csvUpload"
                        accept=".csv"
                        onChange={(e) => handleCSVImport(e.target.files)}
                    />
                    {csvLoaded && <small className="text-success">{csvFileName} uploaded successfully.</small>}
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="jsonUpload" className="form-label me-2">Katapult Job JSON</label>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="json-tooltip">
                                <div style={{ textAlign: 'center' }}>
                                    <img 
                                        src="https://via.placeholder.com/100"
                                        alt="Example JSON"
                                        style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                                    />
                                    <p>Download this JSON from Katapult under the "Job Details" page.</p>
                                </div>
                            </Tooltip>
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="text-primary" style={{ cursor: 'pointer', marginRight: '10px' }} />
                    </OverlayTrigger>
                    <input
                        type="file"
                        className="form-control mt-2"
                        id="jsonUpload"
                        accept=".json"
                        onChange={(e) => handleJSONImport(e.target.files)}
                    />
                    {jsonLoaded && <small className="text-success">{jsonFileName} uploaded successfully.</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="constructionCoordinator" className="form-label">Construction Coordinator</label>
                    <input
                        type="text"
                        className="form-control"
                        id="constructionCoordinator"
                        value={constructionCoordinator}
                        onChange={(e) => setConstructionCoordinator(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="engineer" className="form-label">User Email</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="engineer"
                            placeholder="username" // Placeholder for the engineer's username
                            value={engineer}
                            onChange={(e) => setEngineer(e.target.value)} // Update engineer's name
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">@techserv.com</span> {/* Fixed domain */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormContainer;
