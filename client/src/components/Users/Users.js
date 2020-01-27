import React from "react";
import classes from "./Users.module.css";

// Component content shown only when users asynchronously
// received from a serer

const Users = props => (
  <div className={classes.Outer}>
    {props.users ? (
      <div>
        <h1>Users online:</h1>
        <div className={classes.ActiveContainer}>
          <h2>
            {props.users.map(({ name }) => (
              <div key={name} className={classes.ActiveItem}>
                <span className={classes.Online} role="img" aria-label="online">
                  ⚡
                </span>
                {name}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default Users;
