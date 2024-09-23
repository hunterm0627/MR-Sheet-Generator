import React from 'react';

const ExportForm = ({ date, setDate, name, setName, constructionCoordinator, setConstructionCoordinator, permitNumber, setPermitNumber, address, setAddress }) => {
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="date"
          className="form-control"
          id="floatingDate"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="floatingDate">Date</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingName"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="floatingName">Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingConstructionCoordinator"
          placeholder="Construction Coordinator"
          value={constructionCoordinator}
          onChange={(e) => setConstructionCoordinator(e.target.value)}
        />
        <label htmlFor="floatingConstructionCoordinator">Construction Coordinator</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingPermitNumber"
          placeholder="Permit Number"
          value={permitNumber}
          onChange={(e) => setPermitNumber(e.target.value)}
        />
        <label htmlFor="floatingPermitNumber">Permit Number</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingAddress"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="floatingAddress">Address</label>
      </div>
    </div>
  );
};

export default ExportForm;