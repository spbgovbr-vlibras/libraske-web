import "./styles.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import jwtToPem from "jwk-to-pem";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Loading from "../../assets/loading.svg";
import { storeAuth } from "../../store/modules/auth/actions";

const Authorize = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  //obtains authorization code from URL
  const code = window.location.search.replace("?code=", "");

  //obtains gov.br jwk keys
  let keys;
  axios.get(`${process.env.REACT_APP_LOGIN_UNICO}/jwk`).then((response) => {
    keys = response.data.keys[0];
    console.log(keys);
  });

  //creates encoded data for authorization request header
  const encodedAuth = Buffer.from(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  ).toString("base64");

  //creates authorization request header
  const acessHeader = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: ` Basic ${encodedAuth}`,
    },
  };

  //gov.br authorization request
  axios
    .post(
      `${process.env.REACT_APP_LOGIN_UNICO}/token`,
      `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
      acessHeader
    )
    .then((response) => {
      var decoded = jwt.verify(response.data.id_token, jwtToPem(keys));
      let cpf = decoded.sub;

      let data = {
        name: decoded.name,
        email: decoded.email,
        cpf: cpf,
        access_token: jwt.sign(cpf, process.env.REACT_APP_ACCESS_SECRET),
        refresh_token: jwt.sign(cpf, process.env.REACT_APP_REFRESH_SECRET),
        id_token: response.data.id_token,
      };

      dispatch(storeAuth(data));
      history.push("/play");
    })
    .catch((err) => {
      //TODO-HOMOLOG: INFORMAR ERRO COM TOAST E RETORNAR PARA HOME
      console.log("erro na autenticação");
    });

  return (
    <div id="page-authorize">
      <img className="loading" src={Loading} alt="Carregando" />
      <p className="text">Autenticando...</p>
    </div>
  );
};

export default Authorize;
