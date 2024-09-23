// src/components/PreviewTable.js
import React from 'react';

const PreviewTable = ({ mergedData }) => {
  const nodes = mergedData.nodes || {};  // Make sure "nodes" exists in JSON data

  console.log("Displaying Merged Data:", nodes);  // Log the merged nodes to verify structure

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>SCID</th>
          <th>Pole Number</th>
          <th>CSV Notes</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(nodes).map((key) => {
          const node = nodes[key];
          const attributes = node.attributes || {};

          return (
            <tr key={key}>
              <td>{attributes.scid?.auto_button || 'N/A'}</td>
              <td>{attributes.PoleNumber?.assessment || 'N/A'}</td>
              <td>{attributes.csv_notes || 'No CSV notes'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PreviewTable;
