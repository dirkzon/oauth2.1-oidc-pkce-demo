import { generateAuthorizationUri, getToken, deleteSession, fetchKeycloakJWKSet } from "../services/index.js";
import { createLocalJWKSet, jwtVerify } from 'jose';

export const login = (req, res) => {
    const authorizationUrl = generateAuthorizationUri(req.query.code_challenge);
    res.send({ data: authorizationUrl });
}

export const connect = async (req, res, next) => {
    return await getToken(req.body.code, req.body.code_verifier).then((response) => {
        verifyToken(response.access_token).then(() => {
            res.send(response)
        }).catch((error) => {
            throw new Error(error)
        })
    }).catch((error) => {
        next(error)
    });
}

export const logout = async (req, res, send) => {
    return await deleteSession(req.headers.authorization, req.headers.refresh_token).then(() => {
        res.send()
    }).catch((error) => {
        send(error)
    });
}

async function verifyToken(token) {
    const keys = await fetchKeycloakJWKSet()
    const JWKS = createLocalJWKSet(keys);
    return await jwtVerify(token, JWKS);
}

export default {
    login,
    connect,
    logout
}
