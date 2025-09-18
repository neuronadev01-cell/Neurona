import { google } from 'googleapis';

// Initialize Google Sheets API
async function getSheetsClient() {
  try {
    // Parse the service account key from environment variable
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');
    
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

// Add a new signup to Google Sheets
export async function addSignupToSheet(userData) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      console.warn('Google Sheets ID not provided, skipping sheet update');
      return;
    }

    // Prepare the row data
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const rowData = [
      timestamp,
      userData.name || '',
      userData.email || '',
      userData.phone || '',
      userData.suggestions || '',
      userData.ref || '', // Referral code if they were referred
      userData.referralCode || '', // Their own referral code
      'Active' // Status
    ];

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:H', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log('Successfully added signup to Google Sheets:', response.data.updates);
    return response.data;
    
  } catch (error) {
    console.error('Error adding signup to Google Sheets:', error);
    // Don't throw error to avoid breaking the signup process
    // Just log it for monitoring
  }
}

// Initialize the sheet with headers (run once)
export async function initializeSheetHeaders() {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      console.warn('Google Sheets ID not provided');
      return;
    }

    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Suggestions',
      'Referred By',
      'Referral Code',
      'Status'
    ];

    // Check if headers already exist
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:H1',
    });

    if (existingData.data.values && existingData.data.values.length > 0) {
      console.log('Headers already exist in the sheet');
      return;
    }

    // Add headers if they don't exist
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:H1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [headers],
      },
    });

    console.log('Successfully initialized sheet headers');
    
  } catch (error) {
    console.error('Error initializing sheet headers:', error);
  }
}

// Add invitation to sheet (for tracking referral invites)
export async function addInvitationToSheet(invitationData) {
  try {
    const sheets = await getSheetsClient();
    const invitationsSheetId = process.env.GOOGLE_SHEETS_INVITATIONS_ID || process.env.GOOGLE_SHEETS_ID;
    
    if (!invitationsSheetId) {
      console.warn('Google Sheets ID not provided for invitations');
      return;
    }

    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const rowData = [
      timestamp,
      invitationData.referrerEmail || '',
      invitationData.friendName || '',
      invitationData.friendEmail || '',
      invitationData.referralCode || '',
      'Invited' // Status
    ];

    // Use a different sheet or range for invitations
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: invitationsSheetId,
      range: 'Invitations!A:F', // Different sheet tab for invitations
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log('Successfully added invitation to Google Sheets');
    return response.data;
    
  } catch (error) {
    console.error('Error adding invitation to Google Sheets:', error);
  }
}