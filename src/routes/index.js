import { Switch } from "react-router-dom";

import Home from "../pages/Home";
import Access from "../pages/Access";
import Authorize from "../pages/Authorize";
import Game from "../pages/Game";

import Route from './Route';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Access} path="/access" />
      <Route component={Authorize} path="/authorize" />
      <Route component={Game} path="/play" isPrivate/>
      {/* <Route component={CreatePoint} path="/create-point"/> */}
    </Switch>
  );
};

export default Routes;
