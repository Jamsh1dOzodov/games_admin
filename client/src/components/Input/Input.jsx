import React from "react";
import './Input.scss'



const Input = ({ className, type, id, placeholder, name, onChange }) => {
    return (
        <input name={name} id={id} onChange={onChange} className={className} type={type} placeholder={placeholder} />
    )
}

export default Input;