

/**
 * Objeto de configuração em tempo de execução da aplicação.
 *
 * Cada propriedade é resolvida em tempo de execução preferindo valores expostos
 * no objeto global window.__ENV__ (se presente) e, caso contrário, usando as
 * variáveis de build process.env. Qualquer propriedade pode ser undefined se não
 * for fornecida pelo ambiente.
 *
 * @constant {Object} config
 * @property {string|undefined} apiUrl - URL base da API. Prefere
 *   window.__ENV__.API_URL ou window.__ENV__.REACT_APP_API_URL, caso contrário
 *   process.env.REACT_APP_API_URL.
 * @property {string|undefined} loginUnico - Host/flag do LoginUnico. Obtido de
 *   window.__ENV__.REACT_APP_LOGIN_UNICO ou process.env.REACT_APP_LOGIN_UNICO.
 * @property {string|undefined} clientId - Identificador do cliente OAuth/OpenID.
 *   Obtido de window.__ENV__.REACT_APP_CLIENT_ID ou process.env.REACT_APP_CLIENT_ID.
 * @property {string|undefined} redirectUri - URI de redirecionamento OAuth do
 *   cliente. Obtido de window.__ENV__.REACT_APP_REDIRECT_URI ou
 *   process.env.REACT_APP_REDIRECT_URI.
 * @property {string|undefined} logoutUri - Endpoint/URI de logout. Obtido de
 *   window.__ENV__.REACT_APP_LOGOUT_URI ou process.env.REACT_APP_LOGOUT_URI.
 * @property {string|undefined} apiRedirectUri - URI de redirecionamento da API
 *   backend (se diferente). Obtido de
 *   window.__ENV__.REACT_APP_API_REDIRECT_URI ou process.env.REACT_APP_API_REDIRECT_URI.
 *
 */
export const config = {
  apiUrl:
    (window.__ENV__ && (window.__ENV__.API_URL || window.__ENV__.REACT_APP_API_URL)) ||
    process.env.REACT_APP_API_URL,

  loginUnico:
    (window.__ENV__ && window.__ENV__.REACT_APP_LOGIN_UNICO) ||
    process.env.REACT_APP_LOGIN_UNICO,

  clientId:
    (window.__ENV__ && window.__ENV__.REACT_APP_CLIENT_ID) ||
    process.env.REACT_APP_CLIENT_ID,

  redirectUri:
    (window.__ENV__ && window.__ENV__.REACT_APP_REDIRECT_URI) ||
    process.env.REACT_APP_REDIRECT_URI,

  logoutUri:
    (window.__ENV__ && window.__ENV__.REACT_APP_LOGOUT_URI) ||
    process.env.REACT_APP_LOGOUT_URI,

  apiRedirectUri:
    (window.__ENV__ && window.__ENV__.REACT_APP_API_REDIRECT_URI) ||
    process.env.REACT_APP_API_REDIRECT_URI,
};