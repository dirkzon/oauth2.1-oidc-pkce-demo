import axios from 'axios'

export const generateAuthorizationUri = (code_challenge) => {
    return `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/auth?` +
        `client_id=${process.env.CLIENT_ID}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
        `scope=${process.env.SCOPE}&` +
        `code_challenge_method=S256&` +
        `code_challenge=${code_challenge}`
}

export const getToken = (code, code_verifier) => {
    const tokenEndpoint = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`;

    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET); 
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.REDIRECT_URI);
    params.append('code_verifier', code_verifier);

    return axios.post(tokenEndpoint, params.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
        throw new Error(error);
    });
}

export const deleteSession = (access_token, refresh_token) => {
    return axios.post(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/logout`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: refresh_token
    }, 
    {
        headers: {
            Authorization: access_token,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    });
}

export const fetchKeycloakJWKSet = async () => {
    return axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`).then((response) => {
        return response.data
    });
}

export default {
    generateAuthorizationUri,
    getToken,
    deleteSession,
    fetchKeycloakJWKSet,
}