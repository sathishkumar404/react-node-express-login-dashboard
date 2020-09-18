import {applyMiddleware, compose, createStore} from "redux";
import reducers from "../reducers/index";
import {routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
 import thunk from 'redux-thunk';

 import {  persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
  }
  
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [ thunk, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

  const persistedReducer = persistReducer(persistConfig, reducers)

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState,
    composeEnhancers(applyMiddleware(...middlewares))); 



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export  {history};  


