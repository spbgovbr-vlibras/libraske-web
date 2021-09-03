import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";
import { isBrowser, isMobile } from "react-device-detect";

import Icaro from "../../assets/Icaro.svg";

const Game = () => {
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const [logoutHover, setlogoutHover] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);

  const unityContext = new UnityContext({
    loaderUrl: "unity/react-build.loader.js",
    dataUrl: "unity/react-build.data",
    frameworkUrl: "unity/react-build.framework.js",
    codeUrl: "unity/react-build.wasm",
  });

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

  //Send information to Unity on load
  useEffect(() => {
    unityContext.on("loaded", function () {
      setTimeout(() => {
        unityContext.send("AccessSetup", "SetRefreshToken", auth.refresh_token);
        unityContext.send("AccessSetup", "SetAccessToken", auth.access_token);
        unityContext.send("AccessSetup", "SetName", auth.name);
        unityContext.send("AccessSetup", "SetEmail", auth.email);
      }, 100);
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
