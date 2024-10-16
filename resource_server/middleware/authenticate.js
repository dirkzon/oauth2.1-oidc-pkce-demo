import axios from 'axios'
import { createLocalJWKSet, jwtVerify } from 'jose';

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const response = await axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`)
        const keys = response.data
        try {
            const JWKS = createLocalJWKSet(keys);
            jwtVerify(token, JWKS).then((response) => {
                req.user = response.payload;
                next()
            }).catch((error) => {
                console.log(error)
                return res.sendStatus(403);
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(401)
        }

    } else {
        res.sendStatus(401);
    }
}

export default {
    authenticateJWT
}