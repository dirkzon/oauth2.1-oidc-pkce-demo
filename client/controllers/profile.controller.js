import { getProfileFromToken } from "../services/index.js";

export const getProfile = async (token) => {
    return await getProfileFromToken(token);
}

export default {
    getProfile,
}
