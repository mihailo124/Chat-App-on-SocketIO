import React from "react";
import ReactEmoji from "react-emoji";
import classes from "./Message.module.css";

const Message = props => {
  const name = props.name.trim().toLowerCase();
  let current = props.message.user === name;
  let opacity = 0;
  let currentTime = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});

  const nameOpacityHandler = () => (opacity = !opacity ? 1 : 0);

  //two different types of messages can be shown if its current user's message or not
  const message = current ? (
    <div className={[classes.Container, classes.End].join(" ")}>
      <p
        className={[classes.SentBy, classes.pr].join(" ")}
        style={{ opacity: opacity }}
      >
        {name}
      </p>
      <div
        className={[classes.Box, classes.Green].join(" ")}
        onMouseOver={nameOpacityHandler}
      >
        <p className={[classes.Text, classes.White].join(" ")}>
          {ReactEmoji.emojify(props.message.text)}
        </p>
        <p className={classes.Time}>{currentTime}</p>
      </div>
    </div>
  ) : (
    <div className={[classes.Container, classes.Start].join(" ")}>
      <div className={[classes.Box, classes.Light].join(" ")}>
        <p className={[classes.Text, classes.Dark].join(" ")}>
          {ReactEmoji.emojify(props.message.text)}
        </p>
        <p className={[classes.SentBy, classes.pl].join(" ")}>
          {props.message.user}{" "}
          <span>{currentTime}</span>
        </p>
      </div>
    </div>
  );

  return message;
};

export default Message;
