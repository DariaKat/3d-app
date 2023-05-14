import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "app/App";
import GlobalStyles from "app/global";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <GlobalStyles />
    <App />
  </BrowserRouter>
);
