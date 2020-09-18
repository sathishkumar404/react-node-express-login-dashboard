import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Chat from "./Chat";
import Common from "./Common";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  common: Common,
  chat:Chat
});

export default reducers;
