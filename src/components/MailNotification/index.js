import React from "react";
import NotificationItem from "./NotificationItem";
import {notifications} from "./data";
import Auxiliary from "util/Auxiliary";

const MailNotification = () => {
  return (
    <Auxiliary>
      <div className="gx-popover-header">
        <h3 className="gx-mb-0">Messages</h3>
        <i className="gx-icon-btn icon icon-charvlet-down"/>
      </div>
        <ul className="gx-sub-popover">
          {notifications.map((notification, index) => <NotificationItem key={index}
                                                                        notification={notification}/>)}
        </ul>    </Auxiliary>
  )
};

export default MailNotification;

