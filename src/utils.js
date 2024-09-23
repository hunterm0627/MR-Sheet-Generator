// src/utils.js

// Convert feet and inches to decimal format
const convertToDecimal = (feet, inches) => {
    return parseFloat(feet) + parseFloat(inches) / 12;
  };
  
  // Calculate new height based on Low Power height and return a formatted string
  const calculateNewHeight = (lowPowerHeight, feet, inches) => {
    const currentHeight = convertToDecimal(feet, inches);
    const newHeight = lowPowerHeight - currentHeight;
    const newFeet = Math.floor(newHeight);
    const newInches = Math.round((newHeight - newFeet) * 12);
    return `${newFeet}'-${newInches}"`;
  };
  
  // Process the "make ready" notes and rephrase them with adjusted heights
  export const processMakeReadyNotes = (notes, attributes) => {
    if (!notes || typeof notes !== 'string') return 'No CSV notes';
  
    let processedNotes = '';
  
    // Regex to find Low Power height in the format 'Low Power: Neutral at 24'-3"'
    const lowPowerRegex = /Low Power: .*? at (\d+)'-(\d+)"/;
    const lowPowerMatch = notes.match(lowPowerRegex);
  
    // If Low Power is found, calculate it in decimal format
    const lowPowerHeight = lowPowerMatch ? convertToDecimal(lowPowerMatch[1], lowPowerMatch[2]) : null;
  
    if (lowPowerHeight) {
      // Regex to extract sentences with heights and adjust them
      const sentenceRegex = /([^:.]+ (?:at|to) (\d+)'-(\d+)")[^.]*/g;
      let match;
  
      while ((match = sentenceRegex.exec(notes)) !== null) {
        const [sentence, , feet, inches] = match;
        const newHeight = calculateNewHeight(lowPowerHeight, feet, inches);
  
        // Add new sentences based on attachment type
        if (/comcast/i.test(sentence)) {
          processedNotes += `• Comcast to lower attachments to ${newHeight}.\n\n`;
        } else if (/gigapower/i.test(sentence)) {
          processedNotes += `• Gigapower to install new attachments at ${newHeight}.\n\n`;
        } else if (/com drop/i.test(sentence)) {
          processedNotes += '• Re-sag com drops.\n\n';
        } else {
          processedNotes += `• ${sentence.trim()}\n\n`;
        }
      }
    }
  
    return processedNotes.trim();
  };
  
  