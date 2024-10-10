import axios from 'axios'

export const generateAuthorizationUrl = () => {
    return `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/auth?` +
        `client_id=${process.env.CLIENT_ID}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
        `scope=${process.env.SCOPE}`
}

export const getToken = (code) => {
    const tokenEndpoint = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`;

    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET); 
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.REDIRECT_URI);

    return axios.post(tokenEndpoint, params.toString(), {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.data
    }).catch((error) => {
        throw new Error(error);
    });
}

export default {
    generateAuthorizationUrl,
    getToken,
}