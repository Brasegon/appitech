const Config = {
    oauth: {
        issuer: 'https://api.imgur.com/oauth2',
        clientId: '57fa350242c3839',
        clientSecret: '6b583cba332f1a13b0e5cbd21aa2f9233adb2ca0',
        redirectUrl: 'com.epicture://callback',
        serviceConfiguration: {
            authorizationEndpoint: 'https://api.imgur.com/oauth2/authorize',
            tokenEndpoint: 'https://api.imgur.com/oauth2/token',
            revocationEndpoint: 'https://api.imgur.com/oauth2/revoke'
        }
    }
  };
export default Config;