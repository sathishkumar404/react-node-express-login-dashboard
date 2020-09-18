import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom"; 
import { PersistGate } from 'redux-persist/integration/react';
 import {  persistStore } from 'redux-persist'

import "assets/vendors/style";
import "styles/wieldy.less";
import io from "socket.io-client";
import configureStore, {history} from "./appRedux/store";
import App from "./containers/App/index"; 


export const store = configureStore(); 
let persistor =  persistStore(store);

const NextApp = () =>
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <ConnectedRouter history={history} > 
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter> 
     </PersistGate>
  </Provider>;


export default NextApp;
