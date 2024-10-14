import { getProfileFromToken } from "../services/index.js";

export const getProfile = async (req, res, next) => {
    return await getProfileFromToken(req.headers.authorization).then((response) => {
        return res.send(response.data);
    }).catch((error) => {
        next(error)
    });
}

export default {
    getProfile,
}
