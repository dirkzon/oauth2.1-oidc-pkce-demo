import axios from 'axios'

export const getProfileFromToken = (token) => {
    const userInfoEndpoint = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/userinfo`;
    return axios.get(userInfoEndpoint, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      return response.data
    });
}

export default {
    getProfileFromToken
}