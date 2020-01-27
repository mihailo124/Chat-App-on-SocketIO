import React from "react";
import classes from "./Info.module.css";
import queryString from "query-string";

const Info = props => {
  const shareRoomAdressHandler = () => {
    const hostName = document.location.host;
    const { room } = queryString.parse(document.location.search);
    const URL = `http://${hostName}/?room=${room}`;
    const el = document.createElement("textarea");
    el.value = URL;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className={classes.Info}>
      <div className={classes.Left}>
        <h3>{props.room}</h3>
        <span
          className={classes.Copy}
          onClick={shareRoomAdressHandler}
          role="img"
          aria-label="copyURL"
          title="share chat URL"
        >
          🔗
        </span>
        <p className={classes.Popup}> ⬅ click here to copy URL</p>
      </div>
      <div className={classes.Right}>
        <div className={classes.ShowUsers}>
          <span role="img" aria-label="Users" onClick={props.users}>
            👥
          </span>
        </div>
        <a href="/" className={classes.Close}>
          ×
        </a>
      </div>
    </div>
  );
};

export default Info;
