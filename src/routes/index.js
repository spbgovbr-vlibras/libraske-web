import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Start from "../pages/Start";

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Start} path="/start"/>
      {/* <Route component={CreatePoint} path="/create-point"/> */}
    </Switch>
  );
}

export default Routes;