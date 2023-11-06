import React from "react";
import './Button.scss'


const Button = ({ onClick, children, className, type, disabled }) => {



    return (
        <button className={className} disabled={disabled} type={type} onClick={onClick}>
            {children}
        </button>
    );
};


export default Button;