import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteWrapper = ({ component: Component, isPrivate = false, ...rest }) => {
  //check if store contains logged user data
  const logged = useSelector((state) => state.auth.id_token);

  if (!logged && isPrivate) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouteWrapper;
