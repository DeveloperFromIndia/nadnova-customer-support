import dotenv from 'dotenv'; dotenv.config();
import type { GoogleAuth } from 'google-auth-library';
import type { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

import { google } from 'googleapis';
const sheets = google.sheets('v4');

export class GoogleSheetsService {
    auth: GoogleAuth<JSONClient>;
    spreadsheetId: string;

    constructor() {
        if (!process.env.SHEET_ID) {
            throw new Error("Add sheet id to .env file")
        }
        this.spreadsheetId = process.env.SHEET_ID 
        this.auth = new google.auth.GoogleAuth({
            keyFile: 'google_file.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    }

    async appendData(data: string[]) {
        const client = await this.auth.getClient();
        const spreadsheetId = this.spreadsheetId; 

        const request = {
            spreadsheetId,
            range: 'index', 
            valueInputOption: 'RAW',
            resource: {
                values: [
                    data, 
                ],
            },
            auth: client,
        };

        try {
            const response = sheets.spreadsheets.values.append(request);
        } catch (err) {
            console.error(err);
        }
    }
}