import { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import style from "./Header.module.scss"
import Search from "../Search/Search";

function Header() {
    return (
        <header className={style.header}>
            <Search/>
            <Navigation/>
        </header>
    )
}

export default Header;