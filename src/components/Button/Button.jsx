import { useContext } from "react";
import style from "./Button.module.scss"
import { ItemContext } from "../../App";
import useLocalStorage from "../../hooks/useLocalStorage";

function Button({
    width, 
    height, 
    backgroundColor, 
    color, 
    value, 
    valueInput
}) {
    const {item, setItem, id} = useContext(ItemContext);
    const date = new Date();
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

        const currentDate = date.toLocaleDateString("ru", options);
        // const id = Math.floor(Math.random() * maxInt);
        
    return (
        <div
            onClick={() => setItem(prev => [...prev, {
                'id': id,
                'date': currentDate,
                'value': valueInput
            }])}
            className={style.button}
            style={{
                width,
                height, 
                backgroundColor,
                color
            }}>
            {value}
        </div>
    )
}

export default Button;