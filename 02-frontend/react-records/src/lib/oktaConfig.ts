const oktaConfig = {
   clientId: '0oa9qbfexgdniQnjG5d7',
   issuer: 'https://dev-76356444.okta.com/oauth2/default',
   redirectUri: 'http://localhost:3000/login/callback',
   scopes: ['openid', 'profile', 'email'],
   pkce: true,
   disableHttpsCheck: true
}
export default oktaConfig;