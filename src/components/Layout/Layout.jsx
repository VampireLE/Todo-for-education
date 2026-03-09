import { useContext } from "react";
import { ItemContext } from "../../App";
import Button from "../Button/Button";
import Header from "../Header/Header";
import InputForm from "../InputForm/InputForm";
import Popup from "../Popup/Popup";
import Section from "../Section/Section";
import style from "./Layout.module.scss";

function Layout() {
    const {item, setItem, addTask,setAddTask} = useContext(ItemContext);

    return (
        <div className={style.layout}>
            <div className={style.layout__wrapper}>
                <div>
                    <Popup/>
                    <Header/>
                    <InputForm
                        setAddTask={setAddTask}
                    />
                    <Button
                        width={'200px'} 
                        height={'40px'} 
                        backgroundColor={'blue'} 
                        color={'white'}
                        value={'add task'}
                        valueInput={addTask}
                    />
                    <Section/>
                </div>
            </div>
        </div>
    )
}

export default Layout;