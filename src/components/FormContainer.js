import React from 'react';

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
    currentDate,
    userEmail,
    setUserEmail,
}) => {
    return (
        <div className="border rounded p-3 mb-4">
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

                {/* Name Field */}
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

                {/* Construction Coordinator Field */}
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

                {/* Address Field */}
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

                {/* New User Email Field */}
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">User Email</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="userEmail"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmail(e.target.value); // Update the state
                                console.log("Updated userEmail:", e.target.value); // Log the input change
                            }}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">@techserv.com</span>
                        </div>
                    </div>
                </div>

                {/* Date Field */}
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={currentDate}
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
};

export default FormContainer;
