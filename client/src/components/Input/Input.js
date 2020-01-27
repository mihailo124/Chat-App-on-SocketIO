import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    return (
      <form className={classes.Form}>
        <textarea
          className={classes.Input}
          type="text"
          placeholder="Write a message..."
          value={props.message}
          onChange={event => props.set(event)}
          onKeyPress={event =>
            event.key === "Enter" ? props.send(event) : null
          }
        />
        <button className={classes.Button} onClick={event => props.send(event)}>
          Send
        </button>
      </form>
    );
}

export default Input
