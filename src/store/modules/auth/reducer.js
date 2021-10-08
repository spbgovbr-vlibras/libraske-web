import { STORE_AUTH } from "./types";

const INITIAL_STATE = {
  name: null,
  email: null,
  cpf: null,
  access_token: null,
  refresh_token: null,
  is_guest: null,
};


/**
 * Redutor que armazena as credenciais do usuário.
 * @param {object} state recebe o estado atual dos dados armazenados.
 * @param {object} action recebe informações da ação disparada pelo sistema.
 * @function store/authReducer
 */
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_AUTH:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        cpf: action.payload.cpf,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        is_guest: action.payload.is_guest,
      };

    default:
      return state;
  }
};

export default authReducer;
