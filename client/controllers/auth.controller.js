import { generateAuthorizationUri, getToken, deleteSession } from "../services/index.js";

export const login = (_, res) => {
    const authorizationUrl = generateAuthorizationUri();
    res.send({ data: authorizationUrl });
}

export const connect = async (req, res, next) => {
    return await getToken(req.body.code).then((response) => {
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
