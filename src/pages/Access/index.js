import React, { useState } from 'react'
import "./styles.css";

import Button from "../../components/Button"
import Icaro from '../../assets/Icaro.svg'
import GuestIcon from '../../assets/guest_icon.svg'

const Access = () => {
  const govAuth = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_UNICO}/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid+email+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  const [guest, setGuest] = useState(false)
  const [guestName, setGuestName] = useState('');

  function handleGuest() {
    setGuest(true)
  }

  function refreshPage() {
    setGuest(false)
  }

  return (
    <div id="login_background">
      {guest &&
        <div onClick={refreshPage}>
          <Button text="Voltar" type="voltar" />
        </div>
      }
      <span className="title">LIBRASKÊ</span>
      <span className="subtitle">Karaokê em Libras</span>
      <div className="main_login">
        <section className="icaro_container">
          <img src={Icaro} alt="Icaro" />
        </section>
        <div>
          {!guest ?
            (
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
            ) :
            (
              <>
                <span>Visitante</span>
                <div className="guest_container">

                  <div className="guest_input">
                    <img src={GuestIcon} alt="Ícone Convidado" />
                    <input placeholder="Digite seu nome" maxLength={15} value={guestName} onInput={e => setGuestName(e.target.value)} />
                  </div>
                  <span>*Máximo de 15 caracteres</span>
                  <Button text="Entrar" type="entrar" />
                </div>
              </>
            )
          }
        </div>
      </div>
      {guest &&
        <div className="guest_mode">
          <div> No modo convidado sua pontuação não será armazenada. </div>
          <div> Para isso, utilize a conta &nbsp;
            <span className="govbr" onClick={govAuth}>GOV.BR</span>
          </div>
        </div>
      }
      {/* <footer className="footer_login">
        © Libraskê | Ministério da Economia - LAVID
      </footer> */}
    </div>
  )
};

export default Access;
