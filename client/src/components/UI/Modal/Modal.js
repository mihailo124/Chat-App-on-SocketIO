import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = props => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateX(0)" : "translateX(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <h3>Users online:</h3>
        {props.users
          ? props.users.map(user => (
              <div key={user.name} className={classes.User}>
                <span className={classes.Online} role="img" aria-label="online">
                  ⚡
                </span>
                {user.name}
              </div>
            ))
          : null}
        <div className={classes.Button}>
          <button onClick={props.modalClosed}>×</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
