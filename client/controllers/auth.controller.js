import { generateAuthorizationUri, getToken, deleteSession } from "../services/index.js";

export const login = (req, res) => {
    const authorizationUrl = generateAuthorizationUri(req.body.code_challenge);
    res.send({ data: authorizationUrl });
}

export const connect = async (req, res, next) => {
    return await getToken(req.body.code, req.body.code_verifier).then((response) => {
        res.send(response)
    }).catch((error) => next(error));
}

export const logout = async (req, res, send) => {
    return await deleteSession(req.headers.authorization, req.headers.refresh_token).then(() => {
        res.send()
    }).catch((error) => {
        send(error)
    });
}

export default {
    login,
    connect,
    logout
}
