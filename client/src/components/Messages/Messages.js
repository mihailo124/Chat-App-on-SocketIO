import React from "react";
import classes from "./Messages.module.css";
import Message from "../Message/Message";

import ScrollToButton from "react-scroll-to-bottom";

const Messages = props => {
  const messages = props.messages.map((message, i) => (
    <div key={i}>
      <Message message={message} name={props.name} />
    </div>
  ));
  return (
    <ScrollToButton className={classes.Messages}>{messages}</ScrollToButton>
  );
};

export default Messages;
