import "./styles.css";
import Button from "../../components/Button"

const Start = () => {
  const govAuth = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_UNICO}/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid+email+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  return (
    <div id="page-start">
        <Button title={"Conta Gov.br"} onClick={govAuth}/>
    </div>
  );
};

export default Start;
