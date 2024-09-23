import React from 'react';
import DataTable from './DataTable';
import LoadingSpinner from './LoadingSpinner';

const DataPreview = ({ mergedData, radioOption, isLoading, permitNumber }) => {
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      
      {mergedData.length > 0 ? (
        <DataTable
          mergedData={mergedData}
          showProcessedNotes={radioOption === 'summary'}
          hideComments={radioOption === 'blank'}
          permitNumber={permitNumber}
        />
      ) : (
        <p>No data to display yet. Please upload a CSV and JSON file.</p>
      )}
    </div>
  );
};

export default DataPreview;
