import { useAuthStore } from '@/store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body, headers) => {
        const requestOptions = {
            method,
            headers: authHeader()
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        if (headers) {
            for (let key in headers) {
                requestOptions.headers[key] = headers[key]
            }
        }
        return fetch(url, requestOptions).then((response) => handleResponse(response, url, requestOptions));
    }
}

function authHeader() {
    const { accessToken } = useAuthStore();
    const isLoggedIn = !!accessToken;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}

function handleResponse(response, url, requestOptions) {
    if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json().then((json) => { 
                return json;
            });
        }
    } else {
        const { login, refreshAccessToken, accessToken } = useAuthStore();
        if ([401].includes(response.status) && accessToken) {
            refreshAccessToken().then(async () => {
                return fetch(url, requestOptions).then((response) => handleResponse(response, url, requestOptions));
            }).catch(() => {
                login()
            })
        }
        if ([403, 400, 401].includes(response.status) && !accessToken) {
            login();
        }
        return Promise.reject(response.statusText);
    }
}
