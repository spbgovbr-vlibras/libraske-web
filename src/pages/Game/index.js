import "./styles.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Unity, { UnityContext } from "react-unity-webgl";

const Game = () => {
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const unityContext = new UnityContext({
    loaderUrl: "unity/react.loader.js",
    dataUrl: "unity/react.data",
    frameworkUrl: "unity/react.framework.js",
    codeUrl: "unity/react.wasm",
  });

  const logout = () => {
    sessionStorage.clear();

    window.open(
      `${process.env.REACT_APP_LOGIN_UNICO}/logout?post_logout_redirect_uri=${process.env.REACT_APP_LOGOUT_URI}`,
      "_blank"
    );

    history.push("/");
  };

  //Send information to Unity on load
  useEffect(function () {
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
      <Unity
        unityContext={unityContext}
        style={{ width: "100vw", height: "100vh" }}
      />
      <button id="corner-button" onClick={logout}>
        <i className="logout-icon" />
      </button>
    </div>
  );
};

export default Game;
