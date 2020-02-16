import * as oauth2 from 'simple-oauth2'

const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET } = process.env

const githubModule = oauth2.create({
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
    },
    client: {
        id: GITHUB_OAUTH_CLIENT_ID,
        secret: GITHUB_OAUTH_CLIENT_SECRET
    }
})

const authorizationURI = githubModule.authorizationCode.authorizeURL({
    redirect_uri: '/callback',
    scope: 'user',
    state: '3(#0/!~',
})
