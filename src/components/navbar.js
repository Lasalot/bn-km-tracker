import React from "react"
import "./componentsCss/navbar.css"

const liStyle = {
  display: "inline"
}

const Navbar = () => {

return (
  <nav>
    <ul>
    <li>
        <a href="#">
        Futás
        </a></li>
        <li>
        <a href="#">
        Séta
        </a></li>
        <li>
        <a href="#">
        Kerékpár
        </a></li>
        <li>
        <a href="#">
        Egyéb
        </a></li>
            </ul>
  </nav>
)

}

export default Navbar