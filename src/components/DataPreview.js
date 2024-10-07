import React from 'react';
import DataTable from './DataTable';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const DataPreview = ({ mergedData, radioOption, isLoading, permitNumber }) => {
  return (
    <div className="h-100 d-flex flex-column">
      {isLoading && <LoadingSpinner />}
      
      {mergedData.length > 0 ? (
        <DataTable
          mergedData={mergedData}
          showProcessedNotes={radioOption === 'summary'}
          hideComments={radioOption === 'blank'}
          permitNumber={permitNumber}
        />
      ) : (
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center p-5">
          <FontAwesomeIcon 
            icon={faFileUpload} 
            style={{ fontSize: '100px', color: '#d0d0d0', marginBottom: '30px' }} 
          />
          <h4 className="mb-3">No data to display yet</h4>
          <p className="text-muted">
            Please upload a CSV and JSON file to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataPreview;