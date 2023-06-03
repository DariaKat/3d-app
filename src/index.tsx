import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import { App } from "app/App";
import GlobalStyles from "app/global";
import { store } from "shared/store/store";
import "./app/firebase";
import { AuthProvider } from "shared/hooks/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);
