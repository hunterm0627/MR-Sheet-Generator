export const parseMakeReadyNotes = (makeReadyNotes) => {
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

    const formatHeight = (inches) => {
        const feet = Math.floor(inches / 12);
        const remainingInches = inches % 12;
        return `${feet}'-${remainingInches}"`;
    };

    // Retaining the positive or negative height difference for determining 'above' or 'below'
    const calculateHeightDifference = (lowPowerHeight, attachmentHeight) => {
        return parseHeight(lowPowerHeight) - parseHeight(attachmentHeight);
    };

    const processNote = (note, lowPowerInfo) => {
        if (!note) return "Invalid note";

        console.log("Processing note:", note);

        // Match the company, action (lower/raise), initial height, and final target height (B)
        const companyMatch = note.match(/(GigaPower|Comcast|Centurylink|COMCAST CABLE|UPN|MCI|Zayo)[\s\w]* (lower|raise|attach|at) (.*?) (lower|raise)? (\d+['']?-?\d*[""']?) to (\d+['']?-?\d*[""']?)/i);

        if (companyMatch) {
            const [, company, action, details, , , targetHeightStr] = companyMatch;
            const simplifiedCompany = simplifyCompanyName(company);
            const targetHeight = parseHeight(targetHeightStr); // This is the "B" value in inches
            const lowPowerHeight = parseHeight(lowPowerInfo.height); // Convert low power height to inches

            // Subtract B (target height) from the low power height
            const heightDifference = lowPowerHeight - targetHeight;

            // Determine action and preposition based on height difference
            const actionWord = heightDifference > 0 ? 'lower' : 'raise';
            const preposition = heightDifference > 0 ? 'below' : 'above';
            const formattedHeightDifference = Math.abs(heightDifference); // We want the absolute value for the difference

            // Return phrase with correct grammar
            switch (simplifiedCompany) {
                case 'Gigapower':
                    return `Gigapower to install (1) new ***Capafo Here***ct fiber to pole ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
                case 'Comcast':
                case 'UPN':
                case 'MCI':
                case 'Zayo':
                case 'Centurylink':
                    return `${simplifiedCompany} to ${actionWord} existing attachment${actionWord === 'lower' ? 's' : ''} to ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
                default:
                    return `${simplifiedCompany} to ${actionWord} existing attachment to ${formattedHeightDifference}" ${preposition} ${lowPowerInfo.type}`;
            }
        }

        // Re-sagging com lines
        if (note.toLowerCase().includes('com drop') || note.toLowerCase().includes('re sag com')) {
            return "Re sag com lines.";
        }

        // Handling pole replacements
        if (note.toLowerCase().includes('pole top: replace')) {
            const match = note.match(/Replace (\d+)' class \w+ pole with (\d+)' class (\d+) pole/);
            if (match) {
                return `PNM to replace pole with ${match[2]}'-${match[3]}" due to (***insert reason here***)`;
            }
        }

        return note;
    };




    const simplifyCompanyName = (company) => {
        if (!company) return 'Unknown Company';
        if (company.toLowerCase().includes('gigapower')) return 'Gigapower';
        if (company.toLowerCase().includes('comcast')) return 'Comcast';
        if (company.toLowerCase().includes('centurylink')) return 'Centurylink';
        if (company.toLowerCase().includes('brightspeed')) return 'Brightspeed';
        return company;
    };

    if (!makeReadyNotes || typeof makeReadyNotes !== 'string') {
        console.error("Invalid makeReadyNotes:", makeReadyNotes);
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

    console.log("Low Power Info:", lowPowerInfo);

    const processedNotes = notes.map(note => {
        try {
            return processNote(note, lowPowerInfo);
        } catch (error) {
            console.error("Error processing note:", note, error);
            return "Error processing note";
        }
    });

    // Add pole replacement note if applicable
    const poleReplacementNote = processedNotes.find(note => note.includes('PNM to replace pole'));
    if (poleReplacementNote) {
        processedNotes.push(poleReplacementNote);
    }

    return processedNotes;
};
