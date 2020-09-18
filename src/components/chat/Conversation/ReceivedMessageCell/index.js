import React from "react";
import {Avatar} from "antd";

const ReceivedMessageCell = ({conversation, user}) => {
  return (
    <div className="gx-chat-item">
      <Avatar
        className="gx-size-40 gx-align-self-end"
        src={"https://via.placeholder.com/150x150"}
        alt=""
      />

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.Message}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">
            {conversation.CreatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
