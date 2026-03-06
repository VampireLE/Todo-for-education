import { useContext, useState } from "react";
import Button from "../Button/Button";
import Header from "../Header/Header";
import InputForm from "../InputForm/InputForm";
import Popup from "../Popup/Popup";
import Section from "../Section/Section";
import style from "./Layout.module.scss";
import { ItemContext } from "../../App";

function Layout() {
    const {filteredItem, setItem} = useContext(ItemContext);
    const [value, setValue] = useState('');
    return (
        <div className={style.layout}>
            <div className={style.layout__wrapper}>
                <div>
                    <Popup/>
                    <Header/>
                    <div className={style['add-task']}>
                        <InputForm/>
                        <Button
                            valueInput={value}
                            width={'130px'}
                            height={'35px'}
                            backgroundColor={'#0075ff'}
                            color={'white'}
                            value={'Add new task'}
                        />
                    </div>
                    <Section/>
                </div>
            </div>
        </div>
    )
}

export default Layout;