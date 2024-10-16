import { getDestinationsByID } from "../services/index.js"

export const getDestinations = (req, res) => {
    res.send(getDestinationsByID(req.query.user_id))
}

export default {
    getDestinations,
}
