import React, {Component} from "react";
import {Layout} from "antd";
import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";

import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";
import {connect} from "react-redux";

const {Content, Footer} = Layout;

export class MainApp extends Component {

  
  getNavStyles = () => { 
   return  <Topbar />;
    
  };

  getSidebar = (navStyle, width) => {

      return <Sidebar/>;
    
   
  };

  render() {
    const {match, width, navStyle} = this.props;

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content className={`gx-layout-content gx-container-wrap} `}>
            <App match={match}/>
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {width, navStyle} = settings;
  return {width, navStyle}
};
export default connect(mapStateToProps)(MainApp);

