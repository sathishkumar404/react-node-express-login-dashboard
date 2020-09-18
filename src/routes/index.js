import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./main/index";
import Crud from "./crud/index";
import Chat from "./Chat/index";
const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}crud`} component={Crud}/>
      <Route path={`${match.url}chat`} component={Chat}/>
    </Switch>
  </div>
);

export default App;
