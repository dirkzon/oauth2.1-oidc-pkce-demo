import axios from 'axios'
import { createLocalJWKSet, jwtVerify } from 'jose';

let JWKS;

export const fetchKeycloakJWKSet = () => {
    console.info("Fetching JWK set from Keycloak.")
    axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`).then((response) => {
        JWKS = createLocalJWKSet(response.data);
    });
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

setInterval(fetchKeycloakJWKSet, 60 * 60 *1000);

export default {
    authenticateJWT,
    fetchKeycloakJWKSet
}