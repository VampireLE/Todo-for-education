import { useContext, useState } from "react";
import Button from "../Button/Button";
import style from "./Navigation.module.scss"
import { ItemContext } from "../../App";

function Navigation() {
    const {item, setItem, id} = useContext(ItemContext);
    const [value, setValue] = useState('');
    console.log(item)
    return (
        <div className={style.nav}>
            <div>
                <input 
                    onChange={(e) => setValue(e.target.value)}
                className={style['fild-create-task']} type="text" />
            </div>
            <div>
                <Button
                    id={id}
                    valueInput={value}
                    width={'130px'}
                    height={'35px'}
                    backgroundColor={'#0075ff'}
                    color={'white'}
                    value={'Add new task'}
                />
            </div>
        </div>
    )
}

export default Navigation;