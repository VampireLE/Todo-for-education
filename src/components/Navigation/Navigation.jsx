import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import style from "./Navigation.module.scss"
import { ItemContext } from "../../App";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router";

function Navigation() {

    const navigate = useNavigate();
    return (
        <div className={style.nav__actions}>
            <div onClick={() => navigate('/')} className={style.nav__avtion}>
                Active
            </div>
            <div onClick={() => navigate('/done')} className={style.nav__avtion}>
                Done
            </div>
        </div>
    )
}

export default Navigation;