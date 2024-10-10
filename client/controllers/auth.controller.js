import { generateAuthorizationUrl, getToken } from "../services/index.js";

export const login = () => {
    const authorizationUrl = generateAuthorizationUrl();
    return authorizationUrl;
}

export const connect = async (code) => {
    const token = await getToken(code)
    return token
}

export default {
    login,
    connect
}
