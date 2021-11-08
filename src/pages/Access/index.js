import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { storeAuth } from "../../store/modules/auth/actions";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import GuestIcon from "../../assets/guest_icon.svg";
import Loading from "../../assets/guest_loading.svg";
import IconAtencao from "../../assets/icon_atencao.png";
import LoginGov from "../../assets/videos/login/login_gov.mp4";
import LoginVisita from "../../assets/videos/login/login_visitante.mp4";
import VisitaNome from "../../assets/videos/login/visita_nome.mp4";
import VisitaEntrar from "../../assets/videos/login/visita_entrar.mp4";
import VisitaAlerta from "../../assets/videos/login/visita_alerta.mp4";

/**
 * Página de login. Apresenta ao usuário as opção de login
 * com conta GOV ou login como convidado.
 */
const Access = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  /**
   * Redireciona usuário para a página de login do serviço GOV.BR.
   * Caso a operação seja bem sucedida, serviço retorna ao REDIRECT_URI com o código de acesso.
   *
   * @param  {string}  APP_LOGIN_UNICO Endpoit do serviço login único.
   * @param  {string}  REACT_APP_CLIENT_ID ID do client Libraskê; É necessário para redirecionamento pós autenticação.
   * @param  {string}  REDIRECT_URI URL de redirecionamento após sucesso no login.
   * @function Access/govAuth
   */
  function govAuth() {
    window.location.href = `${process.env.REACT_APP_LOGIN_UNICO}/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid+email+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  }

  /**
   * Autentica usuário convidado na API Libraskê, realizando requisição post na API. Caso seja realizada com
   * sucesso, as credenciais de usuário obtidas são armazenadas e o usuário é direcionado para o jogo. Caso a
   * requisição falhe, é exibida uma mensagem de erro ao usuário.
   *
   * @param  {string}  APP_API_URL - Endpoit da API Libraskê.
   * @param  {string}  guestName - Nome do usuário que deseja se autenticar como convidado.
   * @function Access/guestAuth
   */
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

  const [displayedVideo, setDisplayedVideo] = useState(LoginGov);
  const [playing, setPlaying] = useState(true);

  /**
   * Reproduz o vídeo enviado como parâmetro no player da página. Caso o vídeo passado seja o mesmo
   * que está sendo reproduzido, a função só reinicia vídeo caso a reprodução atual tenha terminado.
   *
   * @param  {string}  video - Vídeo que deve ser reproduzido no player.
   * @function Access/playVideo
   */
  function playVideo(video) {
    setDisplayedVideo(video); 
    setPlaying(true);
  }

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
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            height="100%"
            url={displayedVideo}
            playing={playing}
            onEnded={() => setPlaying(false)}
            muted
          />
        </div>
        <div>
          {!guest ? (
            <>
              <span>Acessar</span>
              <div>
                <div onClick={govAuth} onMouseOver={() => playVideo(LoginGov)}>
                  <Button text="Conta Gov.br" icon="GovIcon" />
                </div>
                <div onClick={handleGuest} onMouseOver={() => playVideo(LoginVisita)}>
                  <Button text="Visitante" icon="GuestIcon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <span>Visitante</span>
              <form className="guest_container">
                <div className="guest_input" onMouseOver={() => playVideo(VisitaNome)}>
                  <img src={GuestIcon} alt="Ícone Convidado" />
                  <input
                    required
                    placeholder="Digite seu nome"
                    maxLength={16}
                    value={guestName}
                    onInput={(e) => setGuestName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <span>*Máximo de 16 caracteres</span>
                {loading ? (
                  <img id="loading" src={Loading} alt="carregando" />
                ) : (
                  <div onClick={guestAuth} onMouseOver={() => playVideo(VisitaEntrar)}>
                    <Button text="Entrar" type="entrar" />
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      {guest && (
        <div className="guest_row" onMouseOver={() => playVideo(VisitaAlerta)}>
          <img src={IconAtencao} alt="Atenção" />
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
        </div>
      )}
      {/* <footer className="footer_login">
        © Libraskê | Ministério da Economia - LAVID
      </footer> */}
    </div>
  );
};

export default Access;
