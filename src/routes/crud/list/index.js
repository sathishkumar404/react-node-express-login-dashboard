import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Data from './data';
import { Col, Row, Button, Icon, Layout, Affix, Breadcrumb,  Dropdown, Pagination,
	PageHeader, Tabs, Statistic, Descriptions, Modal, Datepicker, Drawer, message, Checkbox, Form, Input  } from 'antd';   
import {
  hideMessage,
  showAuthLoader,
  userSignUp,
  deleteUser,
  getUser,
} from "appRedux/actions/Auth"; 
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import TaskByStatus from "components/dashboard/CRM/TaskByStatus";
import Widget from "components/Widget";
const { TabPane } = Tabs;
const FormItem = Form.Item;


const success = () => {
	message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};

export class list extends React.Component {
         constructor(props) {
           super(props);

           this.state = {
             loading: true,
             current: 2,
             modal: false,
             insights: false,
             insightsData: [],
             selectedInsights:'',
             formData: {
               emp_name: "",
               emp_id: "",
               emp_email_id: "",
               emp_mac_id: "",
               emp_phone: "",
               emp_email_password: ""
             }
           };
         }

         handleSubmit = e => {
           console.log("submit");
           e.preventDefault();
           this.props.form.validateFields((err, values) => {
             if (!err) {
               values.emp_image = "";
               values.emp_id = this.state.formData.emp_id;
               values.emp_email_password = Math.random()
                 .toString(36)
                 .slice(-8);
               console.log(values);
               this.props.showAuthLoader();
               this.props.userSignUp(values);
               this.setState({
                 visible: false
               });
             }
           });
         };

         deleteUser = id => {
           this.props.deleteUser(id);
         };
         generateList=()=>{
			 var obj=[];
			  this.state.insightsData.length > 0 &&
          this.state.insightsData
            .map((item, i) => {
              obj.push({
                name: item.emp_emot_type,
                value: item.avg_emot_value
              });
            });

        obj.sort(function(a, b) {
          return parseInt(b.value) - parseInt(a.value);
		}); 
		return obj.map((list, i) => {
      return (
        <div>
          {list.name.toUpperCase()} - {list.value}
        </div>
      );
    });
		 }
         editUser = objdata => {
           this.setState({ formData: JSON.parse(JSON.stringify(objdata)) });
           this.showModal(objdata);
           //    this.props.newUser(objdata);
         };

         viewInsights = data => { 
           
           this.setState({
             insights: true,
             insightsData: data.emotions,
             selectedInsights:data
           });
           console.log('name',this.state.selectedInsights.emp_name);
         };

         showModal = data => {
           if (data) {
           } else {
             var formData = this.state.formData;
             var objectkeys = Object.keys(formData);
             console.log(objectkeys);
             for (var i in objectkeys) {
               formData[objectkeys[i]] = "";
             }
             console.log("clearedData", formData);
             this.setState({ formData });
           }
           this.setState({
             visible: true
           });
         };

         onChange = page => {
           console.log(page);
           this.setState({
             current: page
           });
         };

         handleOk = e => {
           console.log(e);
           this.setState({
             visible: false
           });
         };

         handleCancel = e => {
           console.log(e);
           this.setState({
             visible: false
           });
         };

         componentDidMount = () => {
           var self=this;
           setInterval(() => {
             self.props.getUser();
           }, 2000);
         };

         componentDidUpdate() {
           const { user } = this.props;
           console.log(user);
           if (this.props.showMessage) {
             setTimeout(() => {
               this.props.hideMessage();
             }, 100);
           }
         }

         render() {
           const { getFieldDecorator } = this.props.form;
           const { showMessage, loader, alertMessage, user } = this.props;

           return (
             <Layout>
               <PageHeader
                 onBack={() => window.history.back()}
                 title="Employee List"
                 subTitle=""
                 extra={[
                   <Button key="3" onClick={() => this.showModal()}>
                     ADD
                   </Button>
                 ]}
               ></PageHeader>

               <Row>
                 <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                   <Data
                     list={user}
                     title=""
                     edit={this.editUser}
                     delete={this.deleteUser}
                     viewInsights={this.viewInsights}
                   />
                 </Col>
               </Row>

               <Modal
                 title="User Registration"
                 visible={this.state.visible}
                 onOk={this.handleSubmit}
                 onCancel={this.handleCancel}
               >
                 <div style={{ alignItems: "center" }}>
                   <Form
                     onSubmit={this.handleSubmit}
                     className="gx-signin-form gx-form-row0"
                   >
                     {" "}
                     <Row>
                       <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                         <FormItem>
                           {getFieldDecorator("emp_name", {
                             initialValue: this.state.formData.emp_name,
                             rules: [
                               {
                                 required: true,
                                 message: "Please input your name!"
                               }
                             ]
                           })(<Input type="text" placeholder="Name" />)}
                         </FormItem>
                       </Col>

                       <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                         <FormItem>
                           {getFieldDecorator("emp_email_id", {
                             initialValue: this.state.formData.emp_email_id,
                             rules: [
                               {
                                 required: true,
                                 type: "email",
                                 message: "The input is not valid E-mail!"
                               }
                             ]
                           })(<Input placeholder="Email" />)}
                         </FormItem>
                       </Col>
                       <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                         <FormItem>
                           {getFieldDecorator("emp_phone", {
                             initialValue: this.state.formData.emp_phone,
                             rules: [
                               {
                                 required: true,
                                 message: "Please input your Phone!"
                               }
                             ]
                           })(<Input type="number" placeholder="Phone" />)}
                         </FormItem>
                       </Col>
                       <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                         <FormItem>
                           {getFieldDecorator("emp_mac_id", {
                             initialValue: this.state.formData.emp_mac_id,
                             rules: [{ required: true, message: "Mac Address" }]
                           })(
                             <Input type="mac_id" placeholder="Mac Address" />
                           )}
                         </FormItem>
                       </Col>
                     </Row>
                   </Form>
                 </div>

                 {loader ? (
                   <div className="gx-loader-view">
                     <CircularProgress />
                   </div>
                 ) : null}
                 {showMessage ? message.error(alertMessage.toString()) : null}
               </Modal>

               <Modal
                 title={`View Happiness of ${this.state.selectedInsights.emp_name}`}
                 visible={this.state.insights}
                 onOk={() => this.setState({ insights: false })}
                 onCancel={() => this.setState({ insights: false })}
               >
                 <Row>
                   <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                     <TaskByStatus
                       data1={this.state.insightsData}
                       title={"Happiness Meter"}
                     />
                   </Col>
                   <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                     <Widget
                       title={
                         <h2 className="h4 gx-text-capitalize gx-mb-0">
                           Average List
                         </h2>
                       }
                       styleName="gx-text-center"
                     >
                       <div className="gx-py-3">{this.generateList()}</div>
                     </Widget>
                   </Col>
                 </Row>
               </Modal>
             </Layout>
           );
         }
       }


const ListForm = Form.create()(list);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser, user} = auth;
  return {loader, alertMessage, showMessage, authUser,user}
};

export default connect(mapStateToProps, {
  showAuthLoader,
  hideMessage,
  userSignUp,
  deleteUser,
  getUser
})(ListForm);