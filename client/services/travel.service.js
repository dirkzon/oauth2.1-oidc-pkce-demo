import axios from 'axios'

export const getUserDestinations = (token) => {
  console.log(process.env.RESOURCE_SERVER_BASE_URL)
    return axios.get(`${process.env.RESOURCE_SERVER_BASE_URL}/destinations`, {
      headers: {
        Authorization: token,
      },
    });
}

export default {
  getUserDestinations
}