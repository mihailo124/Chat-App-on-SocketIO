import React, { useState, useEffect, Fragment } from "react";
import Info from "../../components/Info/Info";
import Input from "../../components/Input/Input";
import Messages from "../../components/Messages/Messages";
import Users from "../../components/Users/Users";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./Chat.module.css";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const ENDPOINT = "https://socketsio-chat.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    if (!(name || room)) {
      alert("Error: empty query params!");
      document.location.assign("/");
    }
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => setUsers(users));

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  };

  const setMessageHandler = event => setMessage(event.target.value);

  const modalToggleHandler = () => setModalShow(modalShow ? false : true);

  return (
    <Fragment>
      <div className={classes.OuterWrapper}>
        <div className={classes.InnerWrapper}>
          <Info room={room} users={modalToggleHandler} />
          <Messages messages={messages} name={name} />
          <Input message={message} send={sendMessage} set={setMessageHandler} />
        </div>
        <Users users={users} />
      </div>
      <Modal users={users} show={modalShow} modalClosed={modalToggleHandler} />
    </Fragment>
  );
};

export default Chat;
