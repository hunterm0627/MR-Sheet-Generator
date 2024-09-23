import React from 'react';

function ExportButton({ mergedData }) {
  const handleExport = () => {
    console.log('Exporting data...', mergedData);
  };

  return (
    <button className="btn btn-success ml-2 modern-button" onClick={handleExport}>
      Export Data
    </button>
  );
}

export default ExportButton;