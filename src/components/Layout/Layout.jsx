import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Section from "../Section/Section";
import style from "./Layout.module.scss";

function Layout() {
    return (
        <div className={style.layout}>
            <div className={style.layout__wrapper}>
                <div>
                    <Popup/>
                    <Header/>
                    <Section/>
                </div>
            </div>
        </div>
    )
}

export default Layout;