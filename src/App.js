import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";

import Routes from './routes'
import {store, persistor} from './store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App