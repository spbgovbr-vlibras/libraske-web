import "./styles.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Loading from "../../assets/loading.svg";
import { storeAuth } from "../../store/modules/auth/actions";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Authorize = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  //authorization code from URL
  const code = window.location.search.replace("?code=", "");

  //authentication request body
  const authData = {
    code: code,
    redirectUri: process.env.REACT_APP_API_REDIRECT_URI,
  };

  //libraske API authentication request
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/libraske/auth`, authData)
      .then((response) => {
        console.log(response.data);

        let data = {
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
          access_token: response.data.accessToken,
          refresh_token: response.data.refreshToken,
        };

        dispatch(storeAuth(data));
        history.push("/play");
      })
      .catch((err) => {
        try {
          toast.error(
            <div>
              {err.response.data}
              <br />
              <br /> Por favor, realize o login novamente.
            </div>,
            {
              //onClose: () => history.push("/"),
            }
          );
        } catch (error) {
          toast.error(
            <div>
              Algo deu errado na autenticação. <br />
              <br /> Por favor, realize o login novamente.
            </div>,
            {
              //onClose: () => history.push("/"),
            }
          );
        }
      });
  }, []);

  const fakeAuth = () => {
    let data = {
      name: "test name",
      email: "test@mail.com",
      cpf: "00000000000",
      access_token: "bypass",
      refresh_token: "bypass",
    };

    dispatch(storeAuth(data));
    history.push("/play");
  };

  return (
    <div id="page-authorize">
      <img className="loading" src={Loading} alt="Carregando" />
      <p className="text">Autenticando...</p>
      <button onClick={fakeAuth}>bypass auth</button>
    </div>
  );
};

export default Authorize;
