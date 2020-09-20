// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// https://theoephraim.github.io/node-google-spreadsheet/#/
const { GoogleSpreadsheet } = require('google-spreadsheet');

const { join } = require('path');
const { readFileSync } = require('fs');

/**
 * Flag for testing.
 *
 * This should always be version controlled to true.
 */
const test = true;

/**
 * The template name.
 * 
 * ```
 * Files should be organized as such:
 * - subject: [template_name]-subject.txt
 * - text: [template_name]-text.txt
 * ```
 * 
 * For example, if the mass email template is for PLead Apps
 * in Fall 2020, we set the template name to be 'hello-world',
 * and make `hello-world-subject.txt` and `hello-world-text.txt`
 * files in the `emails/` directory.
 */
const template_name = 'hello-world';

async function connect_to_sheets(sheet_id){
  // Credentials for a service account
  var creds = require('./credentials.json');
  // A document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new GoogleSpreadsheet(sheet_id);
  // Authenticate with the Google Spreadsheets API.
  await doc.useServiceAccountAuth(creds);
  
  // Load Sheets
  await doc.loadInfo();
  // First sheet of the Google Sheets Document
  const sheet = doc.sheetsByIndex[0];
  return (await sheet.getRows());
}

/**
 * Function to personalize the template emails.
 */
function personalize(text, name) {
  return text.replace('NAME', name);
}

/**
 * Send email using the SendGrid SDK.
 * 
 * @param {*} name the first name of the individual
 * @param {*} email the email of the individual
 */
function send_email(name, email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Emails should all be templated in the `emails/` directory
  const directory = `${__dirname}/emails`;
  const subject = readFileSync(join(directory, `${template_name}-subject.txt`)).toString('utf-8');
  const text = readFileSync(join(directory, `${template_name}-text.txt`)).toString('utf-8');

  const msg = {
    to: email,
    from: process.env.CLIENT_EMAIL,
    subject,
    html: personalize(text, name),
  };
  sgMail.send(msg);
}

/**
 * The main function.
 *
 * Scans the `Integ Test` Document when the test flag is true.
 *
 * Scans the `Email List` Document when the test flag is false.
 */
async function main() {
  const sheet_id = test ?
    process.env.TEST_SHEET:    // Integ Test Sheet ID
    process.env.REAL_SHEET;   // Email List Sheet ID
  (await connect_to_sheets(sheet_id)).map((row) => send_email(row.first, row.email))
}

main();

