import React from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

function escapeSpecialChars(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const exportToWord = async ({
  data,
  templatePath,
  blankTemplatePath,
  showProcessedNotes,
  exportEmptyNotes,
  name,
  coordinator,
  permitNumber,
  address,
  date,
  engineer // Use engineer directly
}) => {
  try {
    if (!data || data.length === 0) {
      console.error("No data available to export:", data);
      alert("No data available to export. Please ensure both CSV and JSON files are loaded and processed.");
      return;
    }

    console.log("Exporting data:", data);
    console.log("Engineer Name:", engineer); // Log engineer for debugging

    const response = await fetch(exportEmptyNotes ? blankTemplatePath : templatePath);
    if (!response.ok) throw new Error('Network response was not ok');

    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    
    const doc = new Docxtemplater(zip, { 
      paragraphLoop: true, 
      linebreaks: true,
      nullGetter: function() {
        return "";
      }
    });

    const results = data.map((item, index) => {
      let comments = [];
      if (!exportEmptyNotes) {
        let notes = showProcessedNotes ? item.mrNote : item.transformedMakeReadyNotes;
        notes = typeof notes === 'string' ? notes.split('\n').filter(note => note.trim() !== '') : [];
        comments = [
          ...notes,
          "All licensees to ensure equipment/cable is properly tagged for identification.",
          "All licensees to ensure strand is properly bonded to PNM ground.",
          "All licensees to maintain midspan clearances per NESC.",
          item.isPoleReplacement ? "Note: This pole is a replacement." : null,
          item.grounding === 'Grounded' ? "Grounding assessment: Grounded." : null,
          item.grounding === 'Broken Ground' ? "Separate ticket to PNM to repair broken pole ground." : null
        ].filter(Boolean); 
      }

      return {
        scid: (index + 1).toString(),
        PoleNumber: escapeSpecialChars(item.poleNumber) || 'N/A',
        noAccess: item.isPoleReplacement ? 'NO ACCESS' : '',
        comments: comments
      };
    });

    const templateData = { 
      results,
      date: date || new Date().toLocaleDateString('en-US'),
      name: escapeSpecialChars(name) || '',
      coordinator: escapeSpecialChars(coordinator) || '',
      permitNumber: escapeSpecialChars(permitNumber ? permitNumber.replace(/[()]/g, '') : ''),
      address: escapeSpecialChars(address) || '',
      engineer: escapeSpecialChars(engineer) // Use engineer in the template
    };

    console.log("Template Data:", templateData); // Log template data for debugging

    doc.setData(templateData);
    doc.render();

    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, exportEmptyNotes ? 'blank_output.docx' : 'output.docx');
  } catch (error) {
    console.error("Error exporting to Word:", error);
    alert("Error exporting to Word. Please check the console for details.");
  }
};

const WordExport = (props) => {
  return (
    <button onClick={() => exportToWord(props)} className="btn btn-success mt-3">
      Export to Word
    </button>
  );
};

export default WordExport;
