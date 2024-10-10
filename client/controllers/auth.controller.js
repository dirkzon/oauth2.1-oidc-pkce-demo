import { generateAuthorizationUrl, getToken } from "../services/index.js";

export const login = (_, res) => {
    const authorizationUrl = generateAuthorizationUrl();
    res.send({ data: authorizationUrl });
}

export const connect = async (req, res, next) => {
    return await getToken(req.body.code).then((response) => {
        res.send(response)
    }).catch((error) => next(error));
}

export default {
    login,
    connect
}
