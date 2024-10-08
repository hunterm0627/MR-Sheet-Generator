import React, { useEffect } from 'react';
import WordExport from './WordExport';
import DocumentPreview from './DocumentPreview';
import '../css/RadioOptions.css';

const RadioOptions = ({
    radioOption,
    setRadioOption,
    csvLoaded,
    jsonLoaded,
    mergedData,
    name,
    coordinator,
    permitNumber,
    address,
    date, // Capture the date
    engineer // Include engineer here
}) => {
    const bothFilesLoaded = csvLoaded && jsonLoaded;
    const templatePath = './template.docx';
    const blankTemplatePath = './blank_template.docx';

    useEffect(() => {
        if (bothFilesLoaded && !radioOption) {
            setRadioOption('notes');
        }
    }, [bothFilesLoaded, radioOption, setRadioOption]);

    return (
        <div className="d-flex flex-column align-items-center mb-3">
            <div className="d-flex justify-content-between mb-3" style={{ width: '100%' }}>
                <div style={{ flex: 1, marginRight: '20px', maxWidth: '400px' }}>
                    <h4>Page One</h4>
                    <DocumentPreview
                        name={name || ''}
                        constructionCoordinator={coordinator || ''}
                        address={address || ''}
                        permitNumber={permitNumber || ''}
                        date={date || ''} // Pass date to DocumentPreview
                        engineer={engineer || ''} // Pass engineer to DocumentPreview
                    />
                </div>

                {/* Radio buttons */}
                <div className="d-flex flex-column justify-content-between" style={{ flex: 1, alignItems: 'flex-start', height: '200px' }}>
                    <div className="custom-control custom-checkbox mb-2">
                        <input
                            type="radio"
                            id="katapultMRNotes"
                            name="viewOption"
                            value="notes"
                            checked={radioOption === 'notes'}
                            onChange={(e) => setRadioOption(e.target.value)}
                            className="custom-control-input"
                            disabled={!bothFilesLoaded}
                        />
                        <label className="custom-control-label" htmlFor="katapultMRNotes">Katapult MR Notes</label>
                    </div>

                    <div className="custom-control custom-checkbox mb-2">
                        <input
                            type="radio"
                            id="katapultAutoNotes"
                            name="viewOption"
                            value="summary"
                            checked={radioOption === 'summary'}
                            onChange={(e) => setRadioOption(e.target.value)}
                            className="custom-control-input"
                            disabled={!bothFilesLoaded}
                        />
                        <label className="custom-control-label" htmlFor="katapultAutoNotes">Katapult Summary Notes</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        <input
                            type="radio"
                            id="blank"
                            name="viewOption"
                            value="blank"
                            checked={radioOption === 'blank'}
                            onChange={(e) => setRadioOption(e.target.value)}
                            className="custom-control-input"
                            disabled={!bothFilesLoaded}
                        />
                        <label className="custom-control-label" htmlFor="blank">QC - Blank</label>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            {bothFilesLoaded && (
                <WordExport
                    data={mergedData}
                    templatePath={templatePath}
                    blankTemplatePath={blankTemplatePath}
                    showProcessedNotes={radioOption === 'notes'}
                    exportEmptyNotes={radioOption === 'blank'}
                    name={name}
                    coordinator={coordinator}
                    permitNumber={permitNumber}
                    address={address}
                    date={date} // Pass date to WordExport
                    engineer={engineer} // Pass engineer to WordExport
                />
            )}
        </div>
    );
};

export default RadioOptions;
