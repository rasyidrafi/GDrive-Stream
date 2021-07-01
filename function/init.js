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
  client_id, client_secret, redirect_uris,
  auth_provider_x509_cert_url, auth_uri,
  project_id, token_uri);

let Drive = google.drive({ version: 'v3', auth: oAuth2Client });

const auth = () => {
  // check token
  if (fs.existsSync(TOKEN_PATH)) {
    let token = fs.readFileSync(TOKEN_PATH, 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(token));
    Drive = google.drive({ version: 'v3', auth: oAuth2Client });
    return { status: true };
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    return { status: false, url: authUrl }
  }
}

const tokenBack = async (code) => {
  try {
    const tokenVerify = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokenVerify.tokens);

    fs.writeFile(TOKEN_PATH, JSON.stringify(tokenVerify.tokens), (err) => {
      if (err) return { status: false, msg: err }
      console.log('Token stored to', TOKEN_PATH);
    });
    Drive = google.drive({ version: 'v3', auth: oAuth2Client });
    return { status: true }
  } catch (error) {
    return { status: false, msg: error.message }
  }
}

const getDrive = () => {
  return Drive;
}


module.exports = { auth, tokenBack, getDrive }