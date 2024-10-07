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

// Refactor exportToWord to be a named function that can be directly exported
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
  userEmail // Renamed to userEmail
}) => {
  try {
    if (!data || data.length === 0) {
      console.error("No data available to export:", data);
      alert("No data available to export. Please ensure both CSV and JSON files are loaded and processed.");
      return;
    }

    console.log("Exporting data:", data);
    
    const response = await fetch(exportEmptyNotes ? blankTemplatePath : templatePath);
    if (!response.ok) throw new Error('Network response was not ok');

    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    
    const doc = new Docxtemplater(zip, { 
      paragraphLoop: true, 
      linebreaks: true
    });

    const results = data.map((item, index) => {
      console.log(`Processing item ${index}:`, item);
      
      let comments = [];
      if (!exportEmptyNotes) {
        let notes = showProcessedNotes ? item.mrNote : item.transformedMakeReadyNotes;

        // Ensure notes is an array
        if (typeof notes === 'string') {
          notes = notes.split('\n').filter(note => note.trim() !== '');
        } else if (!Array.isArray(notes)) {
          console.warn(`Notes for item ${index} is neither a string nor an array:`, notes);
          notes = [];
        }

        comments = [
          ...notes,
          "All licensees to ensure equipment/cable is properly tagged for identification.",
          "All licensees to ensure strand is properly bonded to PNM ground.",
          "All licensees to maintain midspan clearances per NESC.",
          item.isPoleReplacement ? "Note: This pole is a replacement." : null,
          item.grounding === 'Grounded' ? "Grounding assessment: Grounded." : null,
          item.grounding === 'Broken Ground' ? "Separate ticket to PNM to repair broken pole ground." : null
        ].filter(Boolean); // Remove null items
      }

      return {
        scid: (index + 1).toString(),
        PoleNumber: escapeSpecialChars(item.poleNumber) || 'N/A',
        noAccess: item.isPoleReplacement ? 'NO ACCESS' : '',
        comments: comments
      };
    });

    // Construct the email address from userEmail
    const recipientEmail = userEmail ? `${userEmail}@techserv.com` : '';

    const templateData = { 
      results,
      date: date || new Date().toLocaleDateString('en-US'),
      name: escapeSpecialChars(name) || '',
      coordinator: escapeSpecialChars(coordinator) || '',
      permitNumber: escapeSpecialChars(permitNumber ? permitNumber.replace(/[()]/g, '') : ''), // Remove parentheses
      address: escapeSpecialChars(address) || '',
      userEmail: recipientEmail // Include the full email address
    };

    // Log the template data to verify the email
    console.log("Template data:", templateData);

    doc.setData(templateData);
    doc.render();

    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, exportEmptyNotes ? 'blank_output.docx' : 'output.docx');
  } catch (error) {
    console.error("Error exporting to Word:", error);
    if (error.properties && error.properties.errors) {
      console.error("Detailed error information:");
      error.properties.errors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err);
        console.error("Context:", error.properties.context[index]);
      });
    }
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    alert("Error exporting to Word. Please check the console for details.");
  }
};

// Keep the button component as it is
const WordExport = (props) => {
  return (
    <button onClick={() => exportToWord(props)} className="btn btn-success mt-3">
      Export to Word
    </button>
  );
};

export default WordExport;
