import "./styles.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Game = () => {
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const logout = () => {
    sessionStorage.clear();

    window.open(
      `${process.env.REACT_APP_LOGIN_UNICO}/logout?post_logout_redirect_uri=${process.env.REACT_APP_LOGOUT_URI}`,
      "_blank"
    );

    history.push("/");
  };

  return (
    <div id="page-game">
      <p>Olá, {auth.name}</p>
      <button id="corner-button" onClick={logout}>
        <i className="logout-icon" />
      </button>
    </div>
  );
};

export default Game;
