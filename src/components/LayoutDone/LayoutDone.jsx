import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Section from "../Section/Section";
import style from "./LayoutDone.module.scss";

function LayoutDone() {
    // const {filteredItem, setItem} = useContext(ItemContext);
    // const [value, setValue] = useState('');
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

export default LayoutDone;