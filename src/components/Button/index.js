import React from 'react'
import './styles.css'

const Button = ({title, onClick}) => {
    return(
        <button onClick={onClick}>{title}</button>
    )
}

export default Button