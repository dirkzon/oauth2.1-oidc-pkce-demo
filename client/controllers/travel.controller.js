import { getUserDestinations } from "../services/index.js";

export const getTravelByID = async (req, res, next) => {
    await getUserDestinations(req.headers.authorization).then((response) => {
        const destinations = response.data
        res.send(destinations)
    }).catch((error) => next(error))
}

export default {
    getTravelByID,
}
