import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Implementação customizada de Rota para o sistema.
 * Somente renderiza a página solicitada caso existam credenciais
 * de usuário válidas armazenadas. Caso contrário, redireciona para a
 * página inicial da aplicação.
 *
 * @param {object} props Parâmetros nativos necessários para renderização da rota.
 */
const RouteWrapper = ({ component: Component, isPrivate = false, ...rest }) => {
  //check if store contains logged user data
  const logged = useSelector((state) => state.auth.access_token);

  if (!logged && isPrivate) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouteWrapper;
