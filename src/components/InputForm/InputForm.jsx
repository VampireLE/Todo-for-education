import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import style from "./InputForm.module.scss"
import { ItemContext } from "../../App";

function InputForm() {
    const {item, setItem} = useContext(ItemContext);
    const [value, setValue] = useState('');
    
    return (
        <div className={style.inputForm}>
            <div>
                <input
                    onChange={(e) => setValue(e.target.value)}
                className={style['fild-create-task']} type="text" />
            </div>
        </div>
    )
}

export default InputForm;