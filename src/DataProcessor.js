import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormContainer from './components/FormContainer';
import DataPreview from './components/DataPreview';
import RadioOptions from './components/RadioOptions';
import SuccessToast from './components/SuccessToast';
import ModalWarning from './components/ModalWarning';
import { parseMakeReadyNotes } from './components/NoteParser';

const DataProcessor = () => {
  const [csvData, setCsvData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [permitNumber, setPermitNumber] = useState('');
  const [mergedData, setMergedData] = useState([]);
  const [csvFileName, setCsvFileName] = useState(null);
  const [jsonFileName, setJsonFileName] = useState(null);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [emptyScidWarning, setEmptyScidWarning] = useState(false);
  const [emptyScidRows, setEmptyScidRows] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [radioOption, setRadioOption] = useState('');

  const [name, setName] = useState('');
  const [constructionCoordinator, setConstructionCoordinator] = useState('');
  const [address, setAddress] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [engineer, setEngineer] = useState(''); // Using engineer instead of userEmail

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  // CSV import handler
  const handleCSVImport = async (files) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);
    setCsvFileName(file.name);

    await new Promise(resolve => setTimeout(resolve, 500));

    Papa.parse(file, {
      complete: (results) => {
        setCsvData(results.data);
        setCsvLoaded(true);
        setShowSuccess(true);
        setIsLoading(false);
      },
      header: true,
      error: (error) => {
        setError('Error parsing CSV file');
        setIsLoading(false);
      },
    });
  };

  // JSON import handler
  const handleJSONImport = async (files) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);
    setJsonFileName(file.name);

    await new Promise(resolve => setTimeout(resolve, 500));

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setJsonData(content);
        setPermitNumber(content.name);
        setJsonLoaded(true);
        setShowSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setError('Error parsing JSON file');
        setIsLoading(false);
      }
    };
    reader.onerror = (error) => {
      setError('Error reading JSON file');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  // Data processing after both CSV and JSON loaded
  useEffect(() => {
    console.log("Engineer State:", engineer); // Log engineer state for debugging
    if (csvData && jsonData) {
      const jsonNodesMap = new Map();
      Object.entries(jsonData.nodes).forEach(([key, node]) => {
        const scid = node.attributes.scid ? Object.values(node.attributes.scid)[0].replace(/^0+/, '') : null;
        if (scid) {
          jsonNodesMap.set(scid, node);
        }
      });

      const emptyRows = [];
      const validCsvRows = csvData.filter((csvRow, index) => {
        const isEmptyRow = Object.values(csvRow).every((value) => !value.trim());
        if (isEmptyRow) return false;

        if (!csvRow.SCID || csvRow.SCID.trim() === '') {
          emptyRows.push(index + 2);
          return false;
        }

        return true;
      });

      if (emptyRows.length > 0) {
        setEmptyScidWarning(true);
        setEmptyScidRows(emptyRows);
      }

      const combined = validCsvRows.map((csvRow) => {
        const scid = csvRow.SCID.replace(/^0+/, '');
        const jsonNode = jsonNodesMap.get(scid);

        if (!jsonNode) return { scid, poleNumber: 'N/A', mrNote: 'N/A', transformedMakeReadyNotes: 'N/A', isPoleReplacement: false, grounding: 'N/A' };

        const mrNote = jsonNode?.attributes?.mr_note ? Object.values(jsonNode.attributes.mr_note)[0] || 'N/A' : 'N/A';
        const poleNumber = jsonNode?.attributes?.PoleNumber ? jsonNode.attributes.PoleNumber.assessment || 'N/A' : 'N/A';
        const transformedMakeReadyNotes = parseMakeReadyNotes(csvRow['Make ready notes'] || '');

        const isPoleReplacement = jsonNode?.attributes?.MR_type === 'Pole Replacement';
        const grounding = jsonNode?.attributes?.grounding?.assessment || 'N/A';

        return { scid, poleNumber, mrNote, transformedMakeReadyNotes, isPoleReplacement, grounding };
      });

      setMergedData(combined);
    }
  }, [csvData, jsonData, engineer]); // Monitor changes, including engineer

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh' }}>
      <div className="row" style={{ padding: '20px' }}>
        <div className="col-12 col-md-5 col-lg-4" style={{ padding: '20px' }}>
          <FormContainer
            name={name}
            setName={setName}
            constructionCoordinator={constructionCoordinator}
            setConstructionCoordinator={setConstructionCoordinator}
            address={address}
            setAddress={setAddress}
            handleCSVImport={handleCSVImport}
            handleJSONImport={handleJSONImport}
            csvFileName={csvFileName}
            jsonFileName={jsonFileName}
            csvLoaded={csvLoaded}
            jsonLoaded={jsonLoaded}
            currentDate={currentDate}
            engineer={engineer} // Pass engineer
            setEngineer={setEngineer} // Pass setEngineer
          />
        </div>

        <div className="col-12 col-md-7 col-lg-8" style={{ padding: '20px' }}>
          <RadioOptions 
            radioOption={radioOption} 
            setRadioOption={setRadioOption} 
            csvLoaded={csvLoaded} 
            jsonLoaded={jsonLoaded}
            mergedData={mergedData}
            name={name}
            coordinator={constructionCoordinator}
            permitNumber={permitNumber}
            address={address}
            date={currentDate}
            engineer={engineer} // Pass engineer to RadioOptions
          />
          <DataPreview
            mergedData={mergedData}
            radioOption={radioOption}
            isLoading={isLoading}
            permitNumber={permitNumber}
            engineer={engineer} // Pass engineer to DataPreview
          />
        </div>
      </div>

      <SuccessToast showSuccess={showSuccess} onClose={() => setShowSuccess(false)} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ModalWarning show={emptyScidWarning} onHide={() => setEmptyScidWarning(false)} emptyScidRows={emptyScidRows} />
    </div>
  );
};

export default DataProcessor;
