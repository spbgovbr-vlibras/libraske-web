import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import { store, persistor } from "./store";

toast.configure({
  autoClose: 3000,
});

/**
 * Função geradora da aplicação.
 * Configura os serviços de Redux, Rotas e Toast.
 *
 * Provider configura o armazenamento do redux, PersistGate
 * garante o armazenamento dos dados do usuário durante a sessão e
 * Toast prepara a exibição de mensagens ao usuário.
 *
 * @param {object} storage Define a estrutura de armazenamento de dados.
 * @param {object} persistor Obtém os dados armazenados antes da renderização da tela.
 */
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
        </Router>
        <ToastContainer closeButton={false} style={{ fontSize: "0.9rem" }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
