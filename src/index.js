import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Alteração para usar a versão correta
import { HashRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import UserService from './service/UserService';

import { SCSContexto } from './components/scs/SCSContexto';
import { initSCS, initSCSFake } from './components/scs/SCSInit';

const renderApp = (scs, erroSCS) => {
  const root = ReactDOM.createRoot(document.getElementById('root')); // Usando createRoot
  root.render(
    <SCSContexto.Provider value={scs}>
      <AppRouter erroSCS={erroSCS}></AppRouter>
    </SCSContexto.Provider>
  );
};

// Inicializando o Keycloak
UserService.initKeycloak(initSCS(renderApp));
// Caso queira usar a versão Fake:
// UserService.initKeycloak(initSCSFake(renderApp));

/*
  O código abaixo foi comentado e pode ser usado se precisar do HashRouter:
  <HashRouter>
    <AppRouter erroSCS={erroSCS}></AppRouter>
  </HashRouter>
*/
