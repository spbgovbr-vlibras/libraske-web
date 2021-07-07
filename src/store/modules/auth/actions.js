import { STORE_AUTH } from "./types";

export const storeAuth = (data) => {
  return {
    type: STORE_AUTH,
    payload: data,
  };
};
