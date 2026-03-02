import Header from "../Header/Header";
import Section from "../Section/Section";
import style from "./Layout.module.scss";

function Layout() {
    return (
        <div className={style.layout}>
            <div className={style.layout__wrapper}>
                <div>
                    <Header/>
                    <Section/>
                </div>
            </div>
        </div>
    )
}

export default Layout;