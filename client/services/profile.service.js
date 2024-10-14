import axios from 'axios'

export const getProfileFromToken = (token) => {
    return axios.get(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/userinfo`, {
      headers: {
        Authorization: token,
      },
    });
}

export default {
    getProfileFromToken
}