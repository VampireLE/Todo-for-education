import { useContext } from "react";
import style from "./Button.module.scss"
import { ItemContext } from "../../App";

function Button({
    width, 
    height, 
    backgroundColor, 
    color,
    value, 
    valueInput
}) {
    const { addItem, generateId } = useContext(ItemContext);
    
    const date = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    
    const currentDate = date.toLocaleDateString("ru", options);
    
    const handleAddTask = () => {
        if (!valueInput || valueInput.trim() === '') {
            alert('Введите название задачи');
            return;
        }
        
        addItem(valueInput, currentDate);
    };

    return (
        <div
            onClick={handleAddTask}
            className={style.button}
            style={{
                width,
                height, 
                backgroundColor,
                color
            }}>
            {value}
        </div>
    );
}

export default Button;