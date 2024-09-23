import React from 'react';

const DataTable = ({ mergedData, showProcessedNotes, hideComments, permitNumber }) => {
  
  // Helper function to get the current date in dd/mm/yyyy format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="mt-4 container">
      <h2>
        Job: {permitNumber && `(${permitNumber})`} 
        <span style={{ float: 'right' }}>{getCurrentDate()}</span>
      </h2>
      <table className="table table-striped table-bordered shadow rounded">
        <thead>
          <tr>
            <th style={{ width: '10%' }}><strong>#</strong></th>
            <th style={{ width: '10%' }}><strong>Pole</strong></th>
            <th style={{ width: '80%' }}><strong>Comments</strong></th>
          </tr>
        </thead>
        <tbody>
          {mergedData.map((row, index) => (
            <tr key={index}>
              <td><strong>{index + 1}</strong></td>
              <td>
                <strong>{row.poleNumber}</strong>
                {row.isPoleReplacement && (
                  <div style={{ color: 'red', fontStyle: 'italic' }}>
                    NO ACCESS
                  </div>
                )}
              </td>
              <td>
                {hideComments ? (
                  <strong className="text-secondary">This will be blank.</strong>
                ) : (
                  <>
                    {showProcessedNotes
                      ? row.transformedMakeReadyNotes
                          .filter(note => note.trim() !== '') 
                          .map((note, i) => (
                            <React.Fragment key={i}>
                              <ul className="mb-1">
                                <li>{note}</li>
                              </ul>
                            </React.Fragment>
                          ))
                      : row.mrNote
                          .split('\n')
                          .filter(line => line.trim() !== '')
                          .map((line, i) => (
                            <React.Fragment key={i}>
                              <ul className="mb-1">
                                <li>{line}</li>
                              </ul>
                            </React.Fragment>
                          ))}

                    <ul>
                      <li>All licensees to ensure equipment/cable is properly tagged for identification.</li>
                      <li>All licensees to ensure strand is properly bonded to PNM ground.</li>
                      <li>All licensees to maintain midspan clearances per NESC.</li>
                      {row.isPoleReplacement && <li>Note: This pole is a replacement.</li>}
                      {row.grounding === 'Grounded' && <li>Grounding assessment: Grounded.</li>}
                      {row.grounding === 'Broken Ground' && <li style={{ color: 'blue' }}>Separate ticket to PNM to repair broken pole ground.</li>}
                    </ul>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
