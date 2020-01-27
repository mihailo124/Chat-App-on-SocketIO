import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";
import classes from "./Join.module.css";
import RecentRooms from "../../components/RecentRooms/RecentRooms";

import io from "socket.io-client";

let socket;

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomsData, setRoomsData] = useState("");
  const [redirect, setRedirect] = useState(false);

  let roomNumber = null; // roomNumber used to hide room input in case query params were passed

  if (window.location.search) {
    roomNumber = queryString.parse(window.location.search).room;
  }

  useEffect(() => {
    const ENDPOINT = "https://socketsio-chat.herokuapp.com/";
    socket = io(ENDPOINT);
    socket.emit("recentRooms", data => {
      setRoomsData(data);
    });
    setRoom(roomNumber);

    if (roomNumber) setRoom(roomNumber);
  }, []);

  const keyPressSubmutHandler = event => {
    if (event.key === "Enter") {
      console.log(event.key);
      if (name && room) {
        setRedirect(true); //sets redurect state and applies <Redirect /> compponent
      }
    }
  };

  const setRoomHandler = room => setRoom(room);

  return (
    <div className={classes.OuterWrapper}>
      <div className={classes.InnerWrapper}>
        <h1 className={classes.Header}>Join Chat {roomNumber}</h1>
        <div>
          <input
            onKeyPress={event => keyPressSubmutHandler(event)}
            placeholder="Name"
            className={classes.JoinInput}
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            onKeyPress={event => keyPressSubmutHandler(event)}
            placeholder="Room name"
            className={
              roomNumber
                ? classes.None
                : [classes.JoinInput, classes.mt20].join(" ")
            }
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={event =>
            !name || !(room || roomNumber) ? event.preventDefault() : null
          }
          to={`/chat?name=${name}&room=${room}`}
        >
          <button
            className={[classes.Button, classes.mt20].join(" ")}
            type="submit"
          >
            Sign In
          </button>
        </Link>
      </div>
      {roomsData ? (
        <RecentRooms setRoomHandler={setRoomHandler} roomsData={roomsData} />
      ) : null}
      {redirect && <Redirect push to={`/chat?name=${name}&room=${room}`} />}
    </div>
  );
};

export default Join;
