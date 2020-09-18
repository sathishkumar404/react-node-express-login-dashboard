import React from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  userSignUp,
  
} from "appRedux/actions/Auth";

import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SignUp extends React.Component { 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        this.props.showAuthLoader();
        this.props.userSignUp(values,()=>{
            console.log('success')
           this.props.form.resetFields() 
           this.props.history.push('/signin')
        },()=>{
            console.log('fail');
        });
       
      }
    });
  };

  constructor() {
    super();
    this.state = {
      email: 'demo@example.com',
      password: 'demo#123'
    }
  }

  componentDidUpdate() {
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
                <img src='https://via.placeholder.com/272x395' alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1>Sign Up</h1>
              </div>
            
            </div>

            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signup-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('Namekey', {
                    rules: [{required: true, message: 'Please input your name!'}],
                  })(
                    <Input placeholder="Name"/>
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('EmailKey', {
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('PasswordKey', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  })(
                    <Input type="password" placeholder="Password"/>
                  )}
                </FormItem>
                  <FormItem>
                  {getFieldDecorator('PhoneNumberKey', {
                    rules: [{required: true, message: 'Please input your Phone No!'}],
                  })(
                    <Input type="number" placeholder="Phone No"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Accept</Checkbox>
                  )}
                  <span className="gx-link gx-signup-form-forgot">Terms and Condition</span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    Sign Up
                  </Button>
                  <Link to="/signin">Sign In</Link>
                </FormItem>
               
              </Form>
            </div>
            {loader &&
            <div className="gx-loader-view">
              <CircularProgress/>
            </div>
            }
            {showMessage &&
            message.error(alertMessage)}
          </div>
        </div>
      </div>

    );
  }

}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader
})(WrappedSignUpForm);
