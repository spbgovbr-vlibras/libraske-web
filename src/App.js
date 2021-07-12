import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import { store, persistor } from "./store";

toast.configure({
  autoClose: 4000,
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
        </Router>
        <ToastContainer closeButton={false} style={{ fontSize: "0.9rem" }}/>
      </PersistGate>
    </Provider>
  );
};

export default App;
