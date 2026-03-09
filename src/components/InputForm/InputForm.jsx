import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import style from "./InputForm.module.scss"

function InputForm({setAddTask}) {
    
    return (
        <div className={style.inputForm}>
            <div>
                <input
                    onChange={(e) => setAddTask(e.target.value)}
                className={style['fild-create-task']} type="text" />
            </div>
        </div>
    )
}

export default InputForm;