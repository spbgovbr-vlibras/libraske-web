import { STORE_AUTH } from "./types";

/**
 * Armazena os dados de autenticação no authReducer.
 * @param {object} data dados do usuário obtidos da API Libraskê.
 * @function store/storeAuth
 */
export const storeAuth = (data) => {
  return {
    type: STORE_AUTH,
    payload: data,
  };
};
