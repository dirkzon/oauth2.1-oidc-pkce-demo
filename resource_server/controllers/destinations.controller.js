import { getDestinationsByID } from "../services/index.js"

export const getDestinations = (req, res) => {
    res.send(getDestinationsByID(req.user.sub));
}

export default {
    getDestinations,
}
