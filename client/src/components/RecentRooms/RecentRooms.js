import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./RecentRooms.module.css";

const RecentRooms = props => {
  const [userToggledStyle, setUserToggledStyle] = useState({ display: "none" });
  const [hovered, setHovered] = useState(true);

  const mouseEnterHandler = () => {
    setUserToggledStyle({ display: "block" });
    setHovered(false);
  };
  const mouseLeaveHandler = () => {
    setUserToggledStyle({ display: "none" });
    setHovered(true);
  };

  const rooms = props.roomsData.map((room, index) => {
    const users = room.users.map(user => (
      <h5 className={classes.User} key={user.name}>
        <span role="img" aria-label="online">
          ⚡
        </span>
        {user.name}
      </h5>
    ));

    const link = `/?room=${room.room}`;

    return (
      <div className={classes.Room} key={room.room}>
        <h2
          className={classes.RoomHeader}
          style={
            room.users.length === 0 || hovered ? { borderBottom: "0" } : null
          }
        >
          <span role="img" aria-label="online">
            🏠
          </span>{" "}
          <Link to={link} onClick={props.setRoomHandler(room.room)}>
            {room.room}
          </Link>
        </h2>
        <div style={userToggledStyle} className={classes.UserContainer}>
          {users}
        </div>
      </div>
    );
  });

  // showing rooms only if there are some fetched from a server
  const roomsShow =
    props.roomsData.length !== 0 ? (
      <div className={classes.RoomsInner} onMouseOver={mouseEnterHandler}>
        {rooms}
      </div>
    ) : (
      <h1 className={classes.None}>-</h1>
    );

  return (
    <div className={classes.RoomsOuter} onMouseLeave={mouseLeaveHandler}>
      <h1 className={classes.Header}>Recent rooms:</h1>
      {roomsShow}
    </div>
  );
};

export default RecentRooms;
