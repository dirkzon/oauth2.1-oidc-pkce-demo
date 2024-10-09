import express from 'express';
const router = express.Router();
import axios from 'axios'

var accessToken = ""

const keycloakConfig = {
    clientId: 'nodeclient',
    redirectUri: 'http://localhost:5173/callback',
    realm: 'keycloak-realm',
    keycloakBaseUrl: 'http://localhost:7080',
    scope: 'openid profile email',
    clientSecret: '3XEXXvKpvegvpxNL5ee0JQ8PdUXop5PY',
  };

router.get('/login', (_, res) => {
  const authorizationUrl = `${keycloakConfig.keycloakBaseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth?` +
      `client_id=${keycloakConfig.clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(keycloakConfig.redirectUri)}&` +
      `scope=${keycloakConfig.scope}`

  res.send(authorizationUrl);
});


router.post('/connect', (req, res, next) => {
  const tokenEndpoint = `${keycloakConfig.keycloakBaseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
  
  const params = new URLSearchParams();
  params.append('client_id', keycloakConfig.clientId);
  params.append('client_secret', keycloakConfig.clientSecret); 
  params.append('grant_type', 'authorization_code');
  params.append('code', req.body.code);
  params.append('redirect_uri', keycloakConfig.redirectUri);

  axios.post(tokenEndpoint, params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    const { access_token, refresh_token, expires_in } = response.data
    accessToken = access_token
    res.send()
  }).catch(next)
})

router.get('/profile', async (req, res, next) => {
  const userInfoEndpoint = `${keycloakConfig.keycloakBaseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`;

  await axios.get(userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    console.log(response.data)
    res.send(response.data)
  });
})

export default router;