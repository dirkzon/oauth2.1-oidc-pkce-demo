import { getProfileFromToken } from "../services/index.js";

export const getProfile = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: 401,
            message: 'No token provided. Authorization required.',
        });
    }
    return await getProfileFromToken(req.headers.authorization).then((response) => {
        return res.send(response);
    }).catch((error) => {
        next(error)});
}


export default {
    getProfile,
}
