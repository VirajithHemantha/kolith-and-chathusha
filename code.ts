function doPost(e) {
  try {
    const sheetName = e.parameter.sheet;
    
    // Explicitly open the spreadsheet by ID
    const SPREADSHEET_ID = '1-fRWQluab-BngrshU0LV9D4rHyZdtTv1kfrKL5n52YM';
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let sheet = doc.getSheetByName(sheetName);

    // Auto-generate sheet and headers if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      
      // Set headers based on the form type
      if (sheetName === 'RSVP') {
        sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Guests', 'Attendance', 'Dietary Restrictions']);
      } else if (sheetName === 'WISH') {
        sheet.appendRow(['Timestamp', 'Name', 'Message']);
      } else {
        // Fallback for unknown sheets
        sheet.appendRow(['Timestamp', 'Data']);
      }
      
      // Style the header row (bold font, frozen row)
      sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Get current date and time
    const timestamp = new Date();
    let rowData = [];

    // Map incoming data to the appropriate columns
    if (sheetName === 'RSVP') {
      rowData = [
        timestamp,
        e.parameter.name || '',
        e.parameter.phone || '',
        e.parameter.guests || '',
        e.parameter.attendance || '',
        e.parameter.dietaryRestrictions || ''
      ];
    } else if (sheetName === 'WISH') {
      rowData = [
        timestamp,
        e.parameter.name || '',
        e.parameter.message || ''
      ];
    } else {
      rowData = [timestamp, JSON.stringify(e.parameter)];
    }

    // Append the data row
    if (rowData.length > 0) {
      sheet.appendRow(rowData);
    }

    // Return success response to the web app
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response if something fails
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET request handler to easily verify the script is live
function doGet(e) {
  return ContentService.createTextOutput("Web App is running successfully!");
}
