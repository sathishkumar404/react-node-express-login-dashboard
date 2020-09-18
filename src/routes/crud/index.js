import React from 'react' 
import {Route,Switch,Redirect}  from 'react-router-dom' 
import asyncComponent from "util/asyncComponent";

const Crud = ({match}) => (

			<Switch> 
			<Redirect from={`${match.url}/`}  to={`${match.url}/list`} exact />
			 <Route path={`${match.url}/list`}  component={asyncComponent(() => import('./list/index'))}/> 
			 </Switch>
);

export default Crud ;