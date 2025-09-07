export const openUrl = (url, target = '_self') => {
  window.open(url, target);
};

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GCP_API_KEY,
  spreadsheetId: import.meta.env.VITE_APP_DATASHEET_ID,
  experienceSheet: 'Experience'
};

// Build Google Sheets URL
export const buildGoogleSheetsURL = (sheetName) => {
  const { apiKey, spreadsheetId } = GOOGLE_SHEETS_CONFIG;
  return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?alt=json&key=${apiKey}`;
};

// Format experience data from Google Sheets
export const formatExperienceData = (rawData) => {
  if (!rawData || !rawData.values) return [];

  // Skip header row and reverse for most recent first
  const dataRows = rawData.values.slice(1).reverse();

  return dataRows.map((row, index) => ({
    id: index,
    from: row[0] || '',
    upto: row[1] || '',
    company: row[2] || '',
    location: row[3] || '',
    mode: row[4] || '',
    designation: row[5] || '',
    techStack: row[6] || '',
    workDescriptions: row[7] || ''
  }));
};
