import React from "react";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom"; 

import {
  hideMessage,
  showAuthLoader,
  userSignIn,
  hideAuthLoader,
  loginUser
} from "appRedux/actions/Auth"; 


import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SignIn extends React.Component { 

  constructor(props) {
    super(props);
  
    this.state = {}; 
    this.props.hideAuthLoader()
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) { 
        this.props.showAuthLoader(); 
        console.log(values)
        this.props.loginUser(values);
      }
    });
  };  


  componentDidUpdate() {console.log('did update') 
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {showMessage, loader, alertMessage} = this.props;

    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>Sign In</h1>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                onSubmit={this.handleSubmit}
                className="gx-signin-form gx-form-row0"
              >
                <FormItem>
                  {getFieldDecorator("email", {
                    initialValue: "sathish@gmail.com",
                    rules: [
                      {
                        required: true,
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ],
                  })(<Input placeholder="Email" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    initialValue: "123456",
                    rules: [
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ],
                  })(<Input type="password" placeholder="Password" />)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(<Checkbox>Accept</Checkbox>)}
                  <span className="gx-signup-form-forgot gx-link">
                    Terms and Condition
                  </span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    Sign In
                  </Button>
                  <Link to="/signup">Sign Up</Link>
                </FormItem>
              </Form>
            </div>

            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : null}
            {showMessage ? message.error(alertMessage.toString()) : null}
          </div>
        </div>
      </div>
    );
  }
} 



const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
}; 

const mapDispatchToProps = dispatch => ({
 loginUser: (values) => dispatch(loginUser(values)),
  hideMessage:()=>dispatch(hideMessage()),
  showAuthLoader:()=>dispatch(showAuthLoader()),
  hideAuthLoader:()=>dispatch(hideAuthLoader()),
  userSignIn:(values)=>dispatch(userSignIn(values))
})




export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);
