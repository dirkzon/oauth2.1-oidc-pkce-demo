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
            headers: authHeader(url)
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
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function authHeader(url) {
    const { auth } = useAuthStore();
    const isLoggedIn = !!auth?.accessToken;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${auth.accessToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const { login, auth } = useAuthStore();
            if ([401, 403, 400].includes(response.status) && !auth) {
                login();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
