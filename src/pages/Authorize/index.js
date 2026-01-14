import "./styles.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Loading from "../../assets/loading.svg";
import { storeAuth } from "../../store/modules/auth/actions";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { config } from "../../config";
/**
 * Página de autorização. É acessada após autenticação com sucesso no sistema do Login Único.
 */
const Authorize = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  /**
   * Código de autorização extraído da URL após redirecionamento do Login Único com sucesso.
   * @constant Authorize/authorization
   */
  const code = window.location.search.replace("?code=", "");

  /**
   * Dados da requisição de autenticação enviados no login para a API Libraskê.
   * @constant Authorize/authData.
   * 
   * As variáveis de ambiente necessárias para a operação são lidas do arquivo de configuração src/config.js.
   * 
   * @param  {string}  REACT_APP_API_REDIRECT_URI URL de redirecionamento após sucesso no login (config.apiRedirectUri).
   * @param  {string}  code Código de autorização obtido após autenticação no serviço Login Único.
   */
  const authData = {
    code: code,
    redirectUri: config.apiRedirectUri,
  };

  /**
   * Realiza a chamada de autenticação do usuário usando o código de autorização fornecido pelo serviço do login único.
   * Caso seja realizada com sucesso, o usuário é direcionado para o jogo. Caso apresente erro, é exibida uma mensagem para o usuário
   * e após expiração da mensagem o usuário é direcionado para a página inicial do Libraskê.
   *
   * @function Authorize/useEffect
   */
  useEffect(() => {
    axios
      .post(`${config.apiUrl}/libraske/auth`, authData)
      .then((response) => {
        let data = {
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
          access_token: response.data.accessToken,
          refresh_token: response.data.refreshToken,
          is_guest: response.data.isGuest,
        };

        dispatch(storeAuth(data));
        history.push("/play");
      })
      .catch(() => {
        toast.error(
          <div>
            Algo deu errado na autenticação. <br />
            <br /> Por favor, realize o login novamente.
          </div>,
          {
            onClose: () => history.push("/"),
          }
        );
      });
  }, []);

  return (
    <div id="page-authorize">
      <img className="loading" src={Loading} alt="Carregando" />
      <p className="text">Autenticando...</p>
    </div>
  );
};

export default Authorize;
