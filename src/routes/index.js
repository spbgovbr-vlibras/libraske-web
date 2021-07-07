import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Access from "../pages/Access";
import Authorize from "../pages/Authorize";

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Access} path="/access" />
      <Route component={Authorize} path="/authorize" />
      {/* <Route component={CreatePoint} path="/create-point"/> */}
    </Switch>
  );
};

export default Routes;
