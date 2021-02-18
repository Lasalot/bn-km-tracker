import React, { useState } from "react"
import "./componentsCss/navbar.css"







const Navbar = (props) => {
  const [isActive, setIsActive] = useState("0")
console.log(props.currentItem.type.name)
return (
  <nav>
    <ul>
    <li>

        {isActive && props.currentItem.type.name === "Running" ? <a className="is-active" onClick={() => {props.running()}}>
        Futás
        </a>  : <a onClick={() => {props.running()}}>
        Futás
        </a>}
        </li>

        {isActive && props.currentItem.type.name === "Walking" ? <li>
        <a className="is-active" onClick={() => {props.walking()
        }} >
        Séta
        </a></li> : <li>
        <a onClick={() => {props.walking()
        }} >
        Séta
        </a></li> }


        {isActive && props.currentItem.type.name === "Cycling" ? <li>
        <a className="is-active" onClick={() => props.cycling()}>
        Kerékpár
        </a></li> : <li>
        <a onClick={() => props.cycling()}>
        Kerékpár
        </a></li> }

        {isActive && props.currentItem.type.name === "Other" ? <li>
        <a className="is-active" onClick={() => props.other()}>
        Egyéb
        </a></li> : <li>
        <a onClick={() => props.other()}>
        Egyéb
        </a></li>}

            </ul>
  </nav>
)

}

export default Navbar