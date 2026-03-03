import style from "./Popup.module.scss"

function Popup() {
    return (
        <div className={style.popup__background}>
            <div className={style.popup}>
                <div className={style.popup__wrapper}>
                    <div>
                        <label>1</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>2</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>3</label>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;