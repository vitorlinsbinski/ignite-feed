import React from "react"; // Pacote responsável pelo core do React
import ReactDOM from "react-dom/client"; // Integração do core do React com a DOM (Document Object Model), ou seja, representação do HTML através do JS. Ou seja, permite o React funcionar no ambiente web, no browser.
import { App } from "./App.js";

// ReactDOM cria HTML e CSS e todo o JS dentro da div "root", elemento raíz do html
// Toda a interface é construída a partir do JS
// Com todo o acesso à interface, o JS consegue manipular de maneira mais fácil os componentes
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
