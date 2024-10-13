# Oauth2.1 OIDC PKCE demo

This repository demonstrates the [OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11) authorization Code Flow with [Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636) (PKCE) and [OpenId Connect](openid.net) (OIDC) to obtain limited access to a protected resource. It includes a user agent, authorization server and client to securely authenticate users, and manage JWT access tokens signed with the EdDSA digital signature algorithm.

## Built with
- **Client:** [Express.js](expressjs.com)
- **User agent:** [Vue.js](vuejs.org) with [Vite](vite.dev) and [pinia](pinia.vuejs.org)
- **Auth/resource server**: [Keycloak](keycloak.org)

## Getting started
This project is built on [Node.Js](nodejs.org) with javascript. This sections explains the steps to set this project up locally.

### Prerequisites
- [npm](npmjs.com)
- [Docker Desktop](docker.com/products/docker-desktop/)
- Intall client dependencies 
```sh
    cd client

    npm install
```
- Install user agent dependencies 
```sh
    cd user_agent

    npm install
```

### Installation
1. clone the repo
```sh
   git clone https://github.com/dirkzon/oauth2.1-oidc-pkce-demo.git
```

2. Spin up the Keycloak auth server.
```sh
   cd auth_server

   docker-compose up
```
_A keycloak container should now be created in Docker Desktop. The [config file](./auth_server/realm-config.json) populates this keycloak instance with a realm, client and users._
!['docker desktop keycloak container'](./examples/keycloak_container.PNG)

3. Start the client
```sh
   cd client

   npm start
```

4. Start the user agent
```sh
   cd user_agent

   npm run dev
```

5. navigate to [http://localhost:5173/](http://localhost:5173/)

**TODO add user agent homepage image**

## How it works
This repository demonstrates the [authorization code flow/grant type](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#name-authorization-code-grant) as described by the OAuth 2.1 Authorization Framework. 
This grant type is used to obtain both access tokens and refresh tokens. Clients utilizing the Authorization Code Grant are susceptible to the authorization code interception attack. 
[PKCE](https://datatracker.ietf.org/doc/html/rfc7636) is a  technique to mitigate these threats.

The OAuth 2.1 Authorization Framework defines four roles:
1. **resource owner (RO):** An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end user. This user will the user will interact with the client through a **user agent**.
2. **resource server (RS):** The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.
3. **client:** An application making protected resource requests on behalf of the resource owner and with its authorization.
4. **authorization server (AS):** The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.

Below a number of sequence diagrams illustrate how these entities communicate with one another to preform the authorization code flow to obtain an access token and user info.
The flow includes the following steps as defined by [OAuth2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-4.1-5):

### 1. Authorization Request Initialization
The client initiates the flow by directing the resource owner's user agent to the authorization endpoint. The client includes its client identifier, code challenge (derived from a generated code verifier), optional requested scope, optional local state, and a redirect URI to which the authorization server will send the user agent back once access is granted (or denied).

![authorization code flow step 1](./examples/AuthFlow_step1.drawio.png)

 ### 2. Resource Owner Authentication
The authorization server authenticates the resource owner (via the user agent) and establishes whether the resource owner grants or denies the client's access request.

### 3. Authorization Code Grant and Redirect
Assuming the resource owner grants access, the authorization server redirects the user agent back to the client using the redirect URI provided earlier (in the request or during client registration). The redirect URI includes an authorization code and any local state provided by the client earlier.

![authorization code flow step 2 & 3](./examples/AuthFlow_step2-3.drawio.png)

 ### 4. Token Request with Authorization Code and Code Verifier
The client requests an access token from the authorization server's token endpoint by including the authorization code received in the previous step, and including its code verifier. When making the request, the client authenticates with the authorization server if it can. The client includes the redirect URI used to obtain the authorization code for verification.

 ### 5. Token Grant and Validation
The authorization server authenticates the client when possible, validates the authorization code, validates the code verifier, and ensures that the redirect URI received matches the URI used to redirect the client in step (3). If valid, the authorization server responds back with an access token and, optionally, a refresh token.

![authorization code flow step 4 & 5](./examples/AuthFlow_step4-5.drawio.png)

### 6. User info retrieval (optional)
Although not necessary for the authorization code flow, this step is included for completeness. Once authenticated, the user agent redirects to the 'profile' page, where a call is made to the client with the access token in the headers. The client then retrieves the user info from the resource server using the same token.

![user info retrieval](/examples/AuthFlow_step6.drawio.png)
