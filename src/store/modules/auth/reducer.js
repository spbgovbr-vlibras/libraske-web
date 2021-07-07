import { STORE_AUTH } from "./types";

const INITIAL_STATE = {
  name: null,
  email: null,
  cpf: null,
  access_token: null,
  refresh_token: null,
  id_token: null,
};

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
        id_token: action.payload.id_token,
      };

    default:
      return state;
  }
};

export default authReducer;
