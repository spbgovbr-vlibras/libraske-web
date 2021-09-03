import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { storeAuth } from "../../store/modules/auth/actions";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import Icaro from "../../assets/Icaro.svg";
import GuestIcon from "../../assets/guest_icon.svg";
import Loading from "../../assets/guest_loading.svg";

const Access = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const govAuth = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_UNICO}/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid+email+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  const guestAuth = () => {
    if (guestName) {
      setLoading(true);

      axios
        .post(`${process.env.REACT_APP_API_URL}/libraske/guest-auth`, {
          guestName: guestName,
        })
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
              Algo deu errado na solicitação. <br />
              <br /> Por favor, tente novamente mais tarde.
            </div>
          );

          setLoading(false);
        });
    }
  };

  const [guest, setGuest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestName, setGuestName] = useState("");

  function handleGuest() {
    setGuest(true);
  }

  function refreshPage() {
    setGuest(false);
  }

  return (
    <div id="login_background">
      {guest && (
        <div onClick={refreshPage}>
          <Button text="Voltar" type="voltar" />
        </div>
      )}
      <span className="title">LIBRASKÊ</span>
      <span className="subtitle">Karaokê em Libras</span>
      <div className="main_login">
        <section className="icaro_container">
          <img src={Icaro} alt="Icaro" />
        </section>
        <div>
          {!guest ? (
            <>
              <span>Acessar</span>
              <div>
                <div onClick={govAuth}>
                  <Button text="Conta Gov.br" icon="GovIcon" />
                </div>
                <div onClick={handleGuest}>
                  <Button text="Visitante" icon="GuestIcon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <span>Visitante</span>
              <form className="guest_container">
                <div className="guest_input">
                  <img src={GuestIcon} alt="Ícone Convidado" />
                  <input
                    required
                    placeholder="Digite seu nome"
                    maxLength={15}
                    value={guestName}
                    onInput={(e) => setGuestName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <span>*Máximo de 15 caracteres</span>
                {loading ? (
                  <img id="loading" src={Loading} alt="carregando" />
                ) : (
                  <div onClick={guestAuth}>
                    <Button text="Entrar" type="entrar" />
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      {guest && (
        <div className="guest_mode">
          <div> No modo convidado sua pontuação não será armazenada. </div>
          <div>
            {" "}
            Para isso, utilize a conta &nbsp;
            <span className="govbr" onClick={govAuth}>
              GOV.BR
            </span>
          </div>
        </div>
      )}
      {/* <footer className="footer_login">
        © Libraskê | Ministério da Economia - LAVID
      </footer> */}
    </div>
  );
};

export default Access;
