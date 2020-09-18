import React, {Component} from "react";
import {Avatar, Button, Drawer, Input, Tabs} from "antd";
import Moment from "moment";
import $ from 'jquery';
import ChatUserList from "components/chat/ChatUserList";
import {
  getUser,
  getChatById,
  insertChat,
  pushChatMessage
} from "appRedux/actions/Chat"; 
import conversationList from "./data/conversationList";
import Conversation from "components/chat/Conversation/index";
import users from "./data/chatUsers";
import ContactList from "components/chat/ContactList/index";
import {connect} from 'react-redux';
import SearchBox from "components/SearchBox";
import CircularProgress from "components/CircularProgress/index";
const TabPane = Tabs.TabPane;  


class Chat extends Component {   
  socket = null;

  constructor() {
    super();
    this.state = {
      loader: false,
      userNotFound: 'No user found',
      drawerState: false,
      selectedSectionId: '',
      selectedTabIndex: 1,
      userState: 1,
      searchChatUser: '',
      contactList: users.filter((user) => !user.recent),
      selectedUser: null,
      message: '',
      chatUsers: users.filter((user) => user.recent),
      conversationList: conversationList,
      conversation: null,
      currentChat:[],
      reConnection:false
    } 
    this.setupSocketListeners()
   
  }

  componentWillReceiveProps=(props)=>{
    if(props.currentChat)
    this.setState({ conversation: props.currentChat });
  }

  

  componentWillMount = () => {
    if(!this.state.reConnection)
    this.onReconnection() 
    
     this.props.getUser()
  };
  


  onClientDisconnected() {
    
  } 

 

  /**
   *
   * Established new connection if reconnected.
   */
  onReconnection() {

      global.socket.emit("sign-in", this.props.authUser.LoginId);
      this.setState({reConnection:true})
 
  }

  /**
   *
   * Setup all listeners
   */

  setupSocketListeners() {
    global.socket.on("message", this.onMessageRecieved.bind(this));
    global.socket.on("reconnect", this.onReconnection.bind(this));
    global.socket.on("disconnect", this.onClientDisconnected.bind(this));
  }

  /**
   *
   * @param {MessageRecievedFromSocket} message
   *
   * Triggered when message is received.
   * It can be a message from user himself but on different session (Tab).
   * so it decides which is the position of the message "right" or "left".
   *
   * increments unread count and appends in the messages array to maintain Chat History
   */

  onMessageRecieved(message) { 
    console.log('called ',message)
    this.props.pushChatMessage(message)
  }

  /**
   *
   * @param {User} e
   *
   * called when user clicks to sign-in
   */
  onUserClicked(e) {
    let user = e.user;
    global.socket.emit("sign-in", user);
    let userChatData = this.state.users.filter(u => u.id !== user.id);
    this.setState({ user, signInModalShow: false, userChatData });
  }

  /**
   *
   * @param {ChatItem} e
   *
   * handles if user clickes on ChatItem on left.
   */
  onChatClicked(e) {
    this.toggleViews();
    let users = this.state.userChatData;
    for (let index = 0; index < users.length; index++) {
      if (users[index].id === e.user.id) {
        users[index].unread = 0;
        this.setState({ selectedUserIndex: index, userChatData: users });
        return;
      }
    }
  }

  /**
   *
   * @param {messageText} text
   *
   * creates message in a format in which messageList can render.
   * position is purposely omitted and will be appended when message is received.
   */
  createMessage(text) {
    let message = {
      to: this.state.userChatData[this.state.selectedUserIndex].id,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message"
      },
      from: this.state.user.id
    }; 
    
  }

  /**
   * Toggles views from 'ChatList' to 'ChatBox'
   *
   * only on Phone
   */
  toggleViews() {
    this.setState({
      showChatBox: !this.state.showChatBox,
      showChatList: !this.state.showChatList
    });
  }


  filterContact = (userName) => {
    if (userName === '') {
      return users.filter(user => !user.recent);
    }
    return users.filter((user) =>
      !user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };
  filterUsers = (userName) => {
    if (userName === '') {
      return users.filter(user => user.recent);
    }
    return users.filter((user) =>
      user.recent && user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };
  Communication = () => {
    const {message, selectedUser, conversation} = this.state;
    
    return (
      <div className="gx-chat-main">
        <div className="gx-chat-main-header">
          <span className="gx-d-block gx-d-lg-none gx-chat-btn">
            <i
              className="gx-icon-btn icon icon-chat"
              onClick={this.onToggleDrawer.bind(this)}
            />
          </span>
          <div className="gx-chat-main-header-info">
            <div className="gx-chat-avatar gx-mr-2">
              <div className="gx-status-pos">
                <Avatar
                  src={selectedUser.thumb}
                  className="gx-rounded-circle gx-size-60"
                  alt=""
                />

                <span className={`gx-status gx-${selectedUser.status}`} />
              </div>
            </div>

            <div className="gx-chat-contact-name">{selectedUser.name}</div>
          </div>
        </div>

        <Conversation
          conversationData={conversation}
          selectedUser={selectedUser}
          senderId={this.props.authUser.LoginId}
        />

        <div className="gx-chat-main-footer">
          <div
            className="gx-flex-row gx-align-items-center"
            style={{ maxHeight: 51 }}
          >
            <div className="gx-col">
              <div className="gx-form-group">
                <textarea
                  id="required"
                  className="gx-border-0 ant-input gx-chat-textarea"
                  onKeyUp={this._handleKeyPress.bind(this)}
                  onChange={this.updateMessageValue.bind(this)}
                  value={message}
                  placeholder="Type and hit enter to send message"
                />
              </div>
            </div>
            <i
              className="gx-icon-btn icon icon-sent"
              onClick={this.submitComment.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  };

  AppUsersInfo = () => {
    return <div className="gx-chat-sidenav-main">
      <div className="gx-bg-grey-light gx-chat-sidenav-header">

        <div className="gx-chat-user-hd gx-mb-0">
          <i className="gx-icon-btn icon icon-arrow-left" onClick={() => {
            this.setState({userState: 1});
          }}/>

        </div>
        <div className="gx-chat-user gx-chat-user-center">
          <div className="gx-chat-avatar gx-mx-auto">
            <Avatar src='https://via.placeholder.com/150x150'
                    className="gx-size-60" alt="John Doe"/>
          </div>

          <div className="gx-user-name h4 gx-my-2">Robert Johnson</div>

        </div>
      </div>
      <div className="gx-chat-sidenav-content">

          <div className="gx-p-4">
            <form>
              <div className="gx-form-group gx-mt-4">
                <label>Mood</label>

                <Input
                  fullWidth
                  id="exampleTextarea"
                  multiline
                  rows={3}
                  onKeyUp={this._handleKeyPress.bind(this)}
                  onChange={this.updateMessageValue.bind(this)}
                  defaultValue="it's a status....not your diary..."
                  placeholder="Status"
                  margin="none"/>

              </div>
            </form>
          </div>

      </div>
    </div>
  };
  ChatUsers = () => {
    return <div className="gx-chat-sidenav-main">

      <div className="gx-chat-sidenav-header">

        <div className="gx-chat-user-hd">

          <div className="gx-chat-avatar gx-mr-3" onClick={() => {
            this.setState({
              userState: 2
            });
          }}>
            <div className="gx-status-pos">
              <Avatar id="avatar-button" src='https://via.placeholder.com/150x150'
                      className="gx-size-50"
                      alt=""/>
              <span className="gx-status gx-online"/>
            </div>
          </div>

          <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
            <div className="gx-module-title">
              <h5 className="gx-mb-0">Robert Johnson</h5>
            </div>
            <div className="gx-module-user-detail">
              <span className="gx-text-grey gx-link">robert@example.com</span>
            </div>
          </div>
        </div>

        <div className="gx-chat-search-wrapper">

          <SearchBox styleName="gx-chat-search-bar gx-lt-icon-search-bar-lg"
                     placeholder="Search or start new chat"
                     onChange={this.updateSearchChatUser.bind(this)}
                     value={this.state.searchChatUser}/>

        </div>
      </div>

      <div className="gx-chat-sidenav-content">
        {/*<AppBar position="static" className="no-shadow chat-tabs-header">*/}
        <Tabs className="gx-tabs-half" defaultActiveKey="1">
          <TabPane label='Recent Chat' tab='Recent Chat' key="1">
              {this.state.chatUsers.length === 0 ?
                <div className="gx-p-5">{this.state.userNotFound}</div>
                :
                <ChatUserList chatUsers={this.state.chatUsers}
                              selectedSectionId={this.state.selectedSectionId}
                              onSelectUser={this.onSelectUser.bind(this)}/>
              }
          </TabPane>
          <TabPane label='contacts' tab='contacts' key="2">
              {
                this.state.contactList.length === 0 ?
                  <div className="gx-p-5">{this.state.userNotFound}</div>
                  :
                  <ContactList contactList={this.props.user.filter(item=>item._id!=this.props.authUser.LoginId)}
                               selectedSectionId={this.state.selectedSectionId}
                               onSelectUser={this.onSelectUser.bind(this)}/>
              }
          </TabPane>
        </Tabs>


      </div>
    </div>
  };


  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };

  handleChange = (event, value) => {
    this.setState({selectedTabIndex: value});
  };

  handleChangeIndex = index => {
    this.setState({selectedTabIndex: index});
  };
  onSelectUser = (user) => { 
    console.log('select user',user) 

    this.setState({
      loader: true,
      selectedSectionId: user._id,
      drawerState: this.props.drawerState,
      selectedUser: user
    }); 
  
   this.props.getChatById(this.props.authUser.LoginId, user._id);

    setTimeout(() => {
      this.setState({loader: false});
    }, 1500);
  };
  showCommunication = () => {
    return (
      <div className="gx-chat-box">
        {this.state.selectedUser === null ?
          <div className="gx-comment-box">
            <div className="gx-fs-80"><i className="icon icon-chat gx-text-muted"/></div>
            <h1 className="gx-text-muted">Select User Chat</h1>
            <Button className="gx-d-block gx-d-lg-none" type="primary"
                    onClick={this.onToggleDrawer.bind(this)}>Select Contact Chat</Button>

          </div>
          : this.Communication()}
      </div>)
  }; 

  submitComment() {
    if (this.state.message !== '') {
    

      this.props.insertChat({
        senderid: this.props.authUser.LoginId,
        receiverid: this.state.selectedUser._id,
        createdat: Moment().format('hh:mm:ss A'),
        message:this.state.message
      }); 
      this.setState({message:''})

    } 
    else
    console.log('no input')
  }

  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  updateSearchChatUser(evt) {
    this.setState({
      searchChatUser: evt.target.value,
      contactList: this.filterContact(evt.target.value),
      chatUsers: this.filterUsers(evt.target.value)
    });
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    });
  }

  render() { 
   
    const {loader, userState, drawerState} = this.state;
    return (
      <div className="gx-main-content">
        <div className="gx-app-module gx-chat-module">
          <div className="gx-chat-module-box">
          <div id='report' ref={this.embed}>
    </div>
            <div className="gx-d-block gx-d-lg-none">
              <Drawer
                placement="left"
                closable={false}
                visible={drawerState}
                onClose={this.onToggleDrawer.bind(this)}>
                {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
              </Drawer>
            </div>
            <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
              {userState === 1 ? this.ChatUsers() : this.AppUsersInfo()}
            </div>
            {loader ?
              <div className="gx-loader-view">
                <CircularProgress/>
              </div> : this.showCommunication()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ chat, auth }) => {
  const { loader, alertMessage, showMessage, user,currentChat } = chat;
  const { authUser} = auth;
  return { loader, alertMessage, showMessage, user, authUser, currentChat };
}; 


const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getChatById: (id, id1) => dispatch(getChatById(id, id1)),
  insertChat: userdata => dispatch(insertChat(userdata)),
  pushChatMessage: data => dispatch(pushChatMessage(data))
});   


export default connect(mapStateToProps,mapDispatchToProps)(Chat)




