import React, { useEffect } from 'react';
import WordExport from './WordExport';
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
    date
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
            <div className="d-flex justify-content-center mb-3">
                <div className="custom-control custom-checkbox mx-2">
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

                <div className="custom-control custom-checkbox mx-2">
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
                    <label className="custom-control-label" htmlFor="katapultAutoNotes">Katapult Auto Notes</label>
                </div>

                <div className="custom-control custom-checkbox mx-2">
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
                    <label className="custom-control-label" htmlFor="blank">Blank</label>
                </div>
            </div>

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
                    date={date}
                />
            )}
        </div>
    );
};

export default RadioOptions;