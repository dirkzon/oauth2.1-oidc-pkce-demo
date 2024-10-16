import { getUserDestinations } from "../services/index.js";

export const getTravelByID = async (req, res, next) => {
    await getUserDestinations(req.headers.authorization).then((response) => {
        const destinations = response.data
        const output = {
            destinations: destinations,
            distance: getTotalDistance(destinations)
        }
        res.send({ data: output})
    }).catch((error) => next(error))
}

const getTotalDistance = (destinations) => {
    let distance = 0;
    for (var i = 0; i < destinations.length; i++) {
        const {long, lat} = destinations[i]
        distance += Math.hypot(lat, long);
    }
    return distance;
}

export default {
    getTravelByID,
}
