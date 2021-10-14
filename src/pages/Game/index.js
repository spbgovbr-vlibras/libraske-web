import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";
import { isBrowser, isMobile } from "react-device-detect";

import Icaro from "../../assets/Icaro.svg";

/**
 * Página que executa o jogo. Só é acessível quando existem credenciais de
 * autenticação válidas no armazenamento da sessão.
 * Caso o usuário esteja em um desktop, executa o jogo. Caso o usuário esteja em um dispositivo móvel,
 * (detectado usando a biblioteca 'react-device-detect') é exibida a tela de incompatibilidade e o jogo não é executado.
 */
const Game = () => {
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const [logoutHover, setlogoutHover] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);

  /**
   * Objeto da biblioteca 'react-unity-webgl'. Recebe as referências dos arquivos necessários
   * para executar o jogo no WebGL. Os arquivos estão localizados na pasta public/unity.
   * @constant Game/UnityContext
   */
  const unityContext = new UnityContext({
    loaderUrl: "unity/libraske.loader.js",
    dataUrl: "unity/libraske.data.unityweb",
    frameworkUrl: "unity/libraske.framework.js.unityweb",
    codeUrl: "unity/libraske.wasm.unityweb",
  });

  /**
   * Limpa as credencais de usuário armazenadas e o direciona para a página inicial da aplicação.
   * Caso o usuário esteja logado com a conta GOV, também realiza o logout no sistema Login Único,
   * sendo necessário abrir a URL do serviço em uma nova guia.
   * @param  {string}  APP_LOGIN_UNICO Endpoit do serviço login único.
   * @param  {string}  APP_LOGOUT_URI URL de redirecionamento necessária para logout no serviço Login Único.
   * @function Game/Logout
   */
  const logout = () => {
    sessionStorage.clear();

    if (!auth.is_guest) {
      window.open(
        `${process.env.REACT_APP_LOGIN_UNICO}/logout?post_logout_redirect_uri=${process.env.REACT_APP_LOGOUT_URI}`,
        "_blank"
      );
    }

    history.push("/");
  };

  /**
   * Envia as credenciais do usuário logado para a Unity após carregamento do jogo.
   * Usa timeout para evitar problemas de sincronia e unityContext.send() para enviar os dados
   * para o jogo.
   * @function Game/useEffect=>loaded
   */
  useEffect(() => {
    unityContext.on("loaded", function () {
      setTimeout(() => {
        unityContext.send("AccessSetup", "SetRefreshToken", auth.refresh_token);
        unityContext.send("AccessSetup", "SetAccessToken", auth.access_token);
        unityContext.send("AccessSetup", "SetName", auth.name);
        unityContext.send("AccessSetup", "SetEmail", auth.email);
        unityContext.send(
          "AccessSetup",
          "SetIsGuest",
          auth.is_guest ? "true" : "false"
        );
      }, 100);
    });
  }, []);

  /**
   * Listener para a chamada da função Logout() na Unity, que deve
   * executar a função no React ao identificar chamada na Unity.
   * @function Game/useEffect=>logout
   */
  useEffect(() => {
    unityContext.on("Logout", () => {
      logout();
    });
  }, []);

  return (
    <div id="page-game">
      {isBrowser && (
        <>
          <Unity
            unityContext={unityContext}
            style={{ width: "100vw", height: "100vh" }}
          />
          <div id="corner-items">
            {logoutHover && <span className="logout-text">Sair</span>}
            <button
              id="corner-button"
              onClick={() => setlogoutModal(true)}
              onMouseEnter={() => setlogoutHover(true)}
              onMouseLeave={() => setlogoutHover(false)}
            >
              <i className="logout-icon" />
            </button>
          </div>
          {logoutModal && (
            <div className="modal-wrapper">
              <div id="logout-modal">
                <span id="logout-title">DESEJA MESMO SAIR?</span>
                <div className="button-row">
                  <button className="fill-button" onClick={logout}>
                    Sim
                  </button>
                  <button
                    className="fill-button"
                    onClick={() => setlogoutModal(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {isMobile && (
        <>
          <div className="modal-wrapper">
            <div id="warning-modal">
              <img id="Icaro" src={Icaro} alt="Icaro" />
              <span id="warning-title">ATENÇÃO</span>
              <span id="info-primary">
                Olá, jogador. Este jogo ainda não é compatível com o seu
                dispotivo.
              </span>
              <span id="info-secondary">
                O Libraskê foi otimizado para computadores. Por isso,{" "}
                <u>não é possível jogá-lo em um celular ou tablet.</u>
              </span>
              <button className="fill-button" onClick={logout}>
                Entendi
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
