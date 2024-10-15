import axios from 'axios'

export const generateAuthorizationUri = (code_challenge) => {
    return `http://localhost:7080/realms/${process.env.REALM}/protocol/openid-connect/auth?` +
        `client_id=${process.env.CLIENT_ID}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
        `scope=${process.env.SCOPE}&` +
        `code_challenge_method=S256&` +
        `code_challenge=${code_challenge}`
}

export const getToken = (code, code_verifier) => {
    return axios.post(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        code_verifier: code_verifier
    },
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
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
    })
}

export const fetchKeycloakJWKSet = async () => {
    return axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`).then((response) => {
        return response.data
    });
}

export const refreshAccessToken = async (refresh_token) => {
    return axios.post(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`, {
        client_id: process.env.CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_secret: process.env.CLIENT_SECRET
    }, 
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

export default {
    generateAuthorizationUri,
    getToken,
    deleteSession,
    fetchKeycloakJWKSet,
    refreshAccessToken,
}