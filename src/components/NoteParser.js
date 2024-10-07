export const parseMakeReadyNotes = (makeReadyNotes) => {
    const debug = true; // Set to true to enable logs

    const parseHeight = (heightStr) => {
        if (!heightStr) return 0;
        const match = heightStr.match(/(\d+)['']?-?(\d+)?[""']?/);
        if (match) {
            const feet = parseInt(match[1], 10);
            const inches = match[2] ? parseInt(match[2], 10) : 0;
            return feet * 12 + inches;
        }
        return 0;
    };

    const calculateHeightDifference = (lowPowerHeight, attachmentHeight) => {
        return parseHeight(lowPowerHeight) - parseHeight(attachmentHeight);
    };

    const processNote = (note, lowPowerInfo) => {
        if (!note || typeof note !== 'string') return "Invalid note";

        if (debug) console.log("Processing note:", note);

        // Check for pole replacement
        if (note.toLowerCase().includes('pole top: replace')) {
            const match = note.match(/Replace (\d+)' class \w+ pole with (\d+)' class (\d+) pole/);
            if (match) {
                return {
                    text: `PNM to replace pole with ${match[2]}'-${match[3]}" due to (***insert reason here***)`,
                    isRed: true // Marking this note to be displayed in red text
                };
            }
        }

        // Exclude "Low Power" notes from the final comments
        if (note.toLowerCase().includes('low power')) {
            return null;
        }

        // Regular expression to match company names and actions
        const companyMatch = note.match(/(GigaPower|Comcast|Centurylink|UPN|MCI|Zayo)[\s\w]* (lower|raise|attach|at) (.*?) (lower|raise)? (\d+['']?-?\d*[""']?) to (\d+['']?-?\d*[""']?)/i);
        
        if (companyMatch) {
            // Removed 'action' and 'details' from destructuring as they are not used
            const [, company, , , , targetHeightStr] = companyMatch;
            const simplifiedCompany = simplifyCompanyName(company);
            const targetHeight = parseHeight(targetHeightStr);
            const lowPowerHeight = parseHeight(lowPowerInfo.height);

            const heightDifference = lowPowerHeight - targetHeight;
            const actionWord = heightDifference > 0 ? 'lower' : 'raise';
            const preposition = heightDifference > 0 ? 'below' : 'above';
            const formattedHeightDifference = Math.abs(heightDifference);

            // Detailed else-if structure for handling different scenarios
            if (simplifiedCompany === 'Gigapower') {
                return `Gigapower to install (1) new ***Capafo Here***ct fiber to pole ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
            } else if (['Comcast', 'UPN', 'MCI', 'Zayo', 'Centurylink'].includes(simplifiedCompany)) {
                return `${simplifiedCompany} to ${actionWord} existing attachment${actionWord === 'lower' ? 's' : ''} to ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
            } else {
                // Default case
                return `${simplifiedCompany} to ${actionWord} existing attachment to ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
            }
        }

        // Handle other specific cases
        if (note.toLowerCase().includes('com drop') || note.toLowerCase().includes('re sag com')) {
            return "Re sag com lines.";
        }

        return note; // Return the original note if no conditions match
    };

    const simplifyCompanyName = (company) => {
        if (!company) return 'Unknown Company';
        const lowerCompany = company.toLowerCase();
        if (lowerCompany.includes('gigapower')) return 'Gigapower';
        if (lowerCompany.includes('comcast')) return 'Comcast';
        if (lowerCompany.includes('centurylink')) return 'Centurylink';
        if (lowerCompany.includes('upn')) return 'UPN';
        if (lowerCompany.includes('mci')) return 'MCI';
        if (lowerCompany.includes('zayo')) return 'Zayo';
        return company;
    };

    if (!makeReadyNotes || typeof makeReadyNotes !== 'string') {
        if (debug) console.error("Invalid makeReadyNotes:", makeReadyNotes);
        return ["Invalid make ready notes"];
    }

    const notes = makeReadyNotes.split('.').map(n => n.trim()).filter(Boolean);
    const lowPowerNote = notes.find(n => n.toLowerCase().includes('low power'));
    let lowPowerInfo = { type: 'unknown power source', height: '0-0' };

    if (lowPowerNote) {
        const match = lowPowerNote.match(/Low Power: (\w+[\s\w]*) at (\d+['']?-?\d*[""']?)/);
        if (match) {
            lowPowerInfo = { type: match[1], height: match[2] };
        }
    }

    if (debug) console.log("Low Power Info:", lowPowerInfo);

    const processedNotes = notes.map(note => {
        try {
            return processNote(note, lowPowerInfo);
        } catch (error) {
            if (debug) console.error("Error processing note:", note, error);
            return "Error processing note";
        }
    }).filter(note => note !== null); // Filter out null notes (e.g., "Low Power")

    // Ensure pole replacement note is placed under the default liability notes
    const poleReplacementNote = processedNotes.find(note => typeof note === 'object' && note.isRed);
    if (poleReplacementNote) {
        processedNotes.push(poleReplacementNote);
    }

    // Convert all notes to strings before returning
    return processedNotes.map(note => {
        if (typeof note === 'object' && note.text) {
            return note.text; // Extract text if it's an object with text property
        }
        return note; // Return the note directly if it's already a string
    });
};
