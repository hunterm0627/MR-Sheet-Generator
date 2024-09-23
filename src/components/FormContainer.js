import React from 'react';

const FormContainer = ({
    handleCSVImport,
    handleJSONImport,
    csvFileName,
    jsonFileName,
    csvLoaded,
    jsonLoaded,
    name,
    setName,
    constructionCoordinator,
    setConstructionCoordinator,
    address,
    setAddress,
}) => {
    return (
        <div className="form-container">
            <form>
                {/* File Upload Fields */}
                <div className="mb-3">
                    <label htmlFor="csvUpload" className="form-label">Katapult Make Ready Summary CSV</label>
                    <input
                        type="file"
                        className="form-control"
                        id="csvUpload"
                        accept=".csv"
                        onChange={(e) => handleCSVImport(e.target.files)}
                    />
                    {csvLoaded && <small className="text-success">{csvFileName} uploaded successfully.</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="jsonUpload" className="form-label">Katapult Job JSON</label>
                    <input
                        type="file"
                        className="form-control"
                        id="jsonUpload"
                        accept=".json"
                        onChange={(e) => handleJSONImport(e.target.files)}
                    />
                    {jsonLoaded && <small className="text-success">{jsonFileName} uploaded successfully.</small>}
                </div>
                {/* Other form fields */}
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
            </form>
        </div>
    );
};

export default FormContainer;
