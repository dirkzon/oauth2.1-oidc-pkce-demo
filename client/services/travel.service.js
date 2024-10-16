import axios from 'axios'

export const getUserDestinations = (token) => {
    return axios.get(`${process.env.RESOURCE_SERVER_BASE_URL}/destinations`, {
      headers: {
        Authorization: token,
      },
    });
}

export default {
  getUserDestinations
}