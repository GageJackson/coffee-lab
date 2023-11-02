export const oktaConfig = {
    clientId: '0oad2uit3iKuvMwum5d7',
    issuer: 'https://dev-45938565.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}