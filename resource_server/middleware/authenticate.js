import axios from 'axios'
import { createLocalJWKSet, jwtVerify } from 'jose';

let JWKS = undefined;

export const fetchKeycloakJWKSet = (max_retries=5, retry_timeout=15, key_rotation_interval=3600) => {
    if (max_retries <= 0) throw new Error("could not fetch JWK set from Keycloak");

    console.info(`Fetching JWK set from Keycloak, ${max_retries} tries left.`)
    axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`)
    .then((response) => {
        console.info("Successfully fetched JSK set from Keyloak.")

        if (!JWKS) {
            setInterval(() => {
                fetchKeycloakJWKSet(max_retries, retry_timeout, key_rotation_interval);
            }, key_rotation_interval * 1000);
        }

        JWKS = createLocalJWKSet(response.data);
    }).catch(() => {
        console.error(`Could not fetch JWK set from Keycloak, trying again in ${retry_timeout} sec.`)

        setTimeout(() => {
            fetchKeycloakJWKSet(max_retries - 1, retry_timeout, key_rotation_interval);
        }, retry_timeout * 1000)
    })
}

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            jwtVerify(token, JWKS).then((response) => {
                req.user = response.payload;
                next()
            }).catch((error) => {
                console.error(error)
                return res.sendStatus(403);
            })
        } catch (error) {
            console.error(error)
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401);
    }
}

export default {
    authenticateJWT,
    fetchKeycloakJWKSet
}