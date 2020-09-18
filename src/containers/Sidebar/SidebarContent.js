import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import SidebarLogo from "./SidebarLogo";

import { userSignOut } from "appRedux/actions/Auth";
import Auxiliary from "util/Auxiliary";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <Menu.Item key="/main/dashboard/crm">
              <Link to="/main/dashboard/crm/">Dashboard</Link>
            </Menu.Item>

            <Menu.Item key="/crud/list">
              <Link to="/crud/list">Employee</Link>
            </Menu.Item>

            <Menu.Item>
              <li onClick={() => this.props.userSignOut()}>Logout</li>
            </Menu.Item>
          </Menu>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps, { userSignOut })(SidebarContent);

