import { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import style from "./Header.module.scss"

function Header() {
    return (
        <header className={style.header}>
            <Navigation/>
        </header>
    )
}

export default Header;