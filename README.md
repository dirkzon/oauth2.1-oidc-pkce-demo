# Oauth2.1 PKCE demo

This repository demonstrates the [OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11) with Proof Key for Code Exchange (PKCE). It includes a user agent, authorization server and client to securely authenticate users, and manage JWT access tokens.

**TODO: add sequence diagram of 

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
   git clone https://github.com/dirkzon/Oauth2.1-pkce-demo.git
```

2. Spin up the Keycloak auth server.
```sh
   cd auth_server

   docker-compose up
```
_A keycloak container should now be created in Docker Desktop. No furter configuration is needed due to the config file which populates the keycloak with a realm, client and users._
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
