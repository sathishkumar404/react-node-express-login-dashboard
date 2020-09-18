import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import setAuthToken from '../../util/setAuthToken';

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting"; 

 
const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;


class App extends Component { 

  constructor(props) {
    super(props); 
    this.initAxios()
  
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };  

  initAxios = ()=>{
    const {token} = this.props;
    if(token !=null)
      setAuthToken(token)

  }

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentWillMount() { 
    console.log('mount') 

    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }
  }

  render() {
    const {match, location, layoutType, navStyle,history, locale, authUser, initURL} = this.props;

    if (location.pathname === '/') {
      console.log('client',authUser);
      if (authUser === null) { 
        return <Redirect to={"/signin"} />;
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return <Redirect to={"/signin"} />;
      } else {
        return ( <Redirect to={initURL}/> );
      }
    }
    this.setLayoutType(layoutType);
    this.setNavStyle(navStyle);

    return (
     
          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <RestrictedRoute path={`${match.url}`} authUser={authUser}
                             component={MainApp}/>
          </Switch>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, layoutType} = settings;
  const {authUser,token, initURL} = auth;
  return {locale, navStyle, layoutType, authUser, initURL,token}
};
export default connect(mapStateToProps, {setInitUrl, setThemeType, onNavStyleChange, onLayoutTypeChange})(App);
