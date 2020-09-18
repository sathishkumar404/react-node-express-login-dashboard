import React from "react";
import {Avatar} from "antd";

const UserCell = ({onSelectUser, selectedSectionId, user}) => {

  return (
    <div
      className={`gx-chat-user-item ${
        selectedSectionId === user._id ? "active" : ""
      }`}
      onClick={() => {
        onSelectUser(user);
      }}
    >
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            <Avatar
              src={"https://via.placeholder.com/150x150"}
              className="gx-size-40"
              alt="Abbott"
            />
            <span className={`gx-status `} />
          </div>
        </div>

        <div className="gx-chat-contact-col">
          <div className="h4 gx-name">{user.Name}</div>
          <div className="gx-chat-info-des gx-text-truncate">
            Lorum Ipsum Lorum Ipsum
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCell;
