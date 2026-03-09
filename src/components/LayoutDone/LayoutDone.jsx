import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Section from "../Section/Section";
import SectionDone from "../SectionDone/SectionDone";
import style from "./LayoutDone.module.scss";

function LayoutDone() {
    return (
        <div className={style.layout}>
            <div className={style.layout__wrapper}>
                <div>
                    <Popup/>
                    <Header/>
                    <SectionDone/>
                </div>
            </div>
        </div>
    )
}

export default LayoutDone;