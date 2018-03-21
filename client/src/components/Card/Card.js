import React from "react";
import "./Card.css"

const Card = (props) => (
  <div {...props} className="card card-style">
    <div className="card-body">
        <h5 className="card-title card-header-style">{props.header}</h5>

        {props.children}

    </div>
  </div>
);

export default Card;