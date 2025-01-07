import Keycloak from "keycloak-js";
 
 
console.log('carregando config de seguranca ' + process.env.NODE_ENV  + " " + process.env.REACT_APP_KEYCLOAK_DOMINIO)
let config = './keycloakconfig';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
 
  config = {
    "realm": process.env.REACT_APP_KEYCLOAK_DOMINIO,
    "url": process.env.REACT_APP_KEYCLOAK_URL,
    "clientId": process.env.REACT_APP_KEYCLOAK_RECURSO
 
  }
}
 
 
 
console.log(config)
 
const _kc = new Keycloak(config);
 
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
 
  // console.log("===> " +  window.location.origin + process.env.PUBLIC_URL + '/silent-check-sso.html')
  _kc.init({
    //onLoad: 'check-sso',
   // silentCheckSsoRedirectUri: window.location.origin + process.env.PUBLIC_URL + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
       if (authenticated) {
        console.log('token: ' + _kc.token )
      onAuthenticatedCallback();
       } else {
         doLogin();
       }
    })
 
 
 
    setInterval(() => {    
   
      console.log('refresh 1  ')
      _kc.updateToken(6*5).then((refreshed) => {
        console.log('refresh 2  ')
        if (refreshed) {
          console.log('refresh 3  ')
          console.log( _kc.token)
          console.log('novo token gerado ' )
 
      } else {
        console.log('refresh 4  ')
        console.warn('Token  ao foi atuailzado, valido ainda por  '
          + Math.round(_kc.tokenParsed.exp + _kc.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch((e) => {
      console.error('Failed to refresh token: ' + e);
    });
 
 
    }, 5*6000);
 
 
};
 
const doLogin = _kc.login;
 
const doLogout = _kc.logout;
 
const getToken = () => _kc.token;
 
const isLoggedIn = () => !!_kc.token;
 
const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
 
const getUsername = () => _kc.tokenParsed?.preferred_username;
 
const getName = () => _kc.tokenParsed?.name;
 
 
 
const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));
 
const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getName,
  hasRole,
};
 
export default UserService;