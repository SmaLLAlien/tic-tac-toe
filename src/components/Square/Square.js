import React, {useState} from "react";

const Square = props => {
    const {value, onClicked} = props;

    return (
        <button className="square" onClick={() => onClicked('X')}>
            {value}
        </button>
    )
}

export default Square;
