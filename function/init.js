require('dotenv').config();

const { 
  auth_provider_x509_cert_url,
  auth_uri,
  client_id,
  client_secret,
  project_id,
  redirect_uris,
  token_uri
  } = process.env;

const fs = require('fs');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = __dirname + '/token.json';

// init auth
const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris);

const auth = () => {
  // check token
  if (fs.existsSync(TOKEN_PATH)) {
      let token = fs.readFileSync(TOKEN_PATH, 'utf-8');
      oAuth2Client.setCredentials(JSON.parse(token));
      return true;
  } else {
    let theDrive = google.drive({ version: 'v3', auth: oAuth2Client });
    const authUrl = oAuth2Client
      .generateAuthUrl({
                          access_type: 'offline',
                          scope: SCOPES
                      });
                      socket.emit('visit', authUrl);
                      socket.on('confirm', code => {
                          oAuth2Client.getToken(code, (err, token) => {
                              if (err) return console.error('Error retrieving access token', err);
                              oAuth2Client.setCredentials(token);
                              // Store the token to disk for later program executions
                              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                                  if (err) return console.error(err);
                                  console.log('Token stored to', TOKEN_PATH);
                              });
                              theDrive = google.drive({ version: 'v3', auth: oAuth2Client });
                          });
                      })
  }
}




const getAuth = () => {
    return theDrive;
}

module.exports = { driveHandleSocket, getAuth }