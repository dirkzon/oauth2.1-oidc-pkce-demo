import express from 'express';
const router = express.Router();
import axios from 'axios'

const keycloakConfig = {
    clientId: 'nodeclient',
    redirectUri: 'http://localhost:5000/callback',
    realm: 'keycloak-realm',
    keycloakBaseUrl: 'http://localhost:7080',
    scope: 'openid profile email',
    clientSecret: '3XEXXvKpvegvpxNL5ee0JQ8PdUXop5PY',
  };

router.get('/login', (_, res) => {

const authorizationUrl = `${keycloakConfig.keycloakBaseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth?` +
    `client_id=${keycloakConfig.clientId}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(keycloakConfig.redirectUri)}&`

res.redirect(authorizationUrl);
});

router.get('/callback', async (req, res) => {
    const { code, state } = req.query;
  
    const token = await exchangeCodeForTokens(code)
    console.log("token:", token)
    res.send(String(token.data.access_token))
});

async function exchangeCodeForTokens(code) {
    const tokenEndpoint = `${keycloakConfig.keycloakBaseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
  
    const params = new URLSearchParams();
    params.append('client_id', keycloakConfig.clientId);
    params.append('client_secret', keycloakConfig.clientSecret); 
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', keycloakConfig.redirectUri);
  
    const response = await axios.post(tokenEndpoint, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    return response;
}

export default router;