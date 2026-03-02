import { useContext } from "react";
import style from "./Section.module.scss"
import { ItemContext } from "../../App";

function Section() {
    const {item, id} = useContext(ItemContext);
    const removeItem = () => {
        if (!item) return 'not found'
        const index = item.filter((val)=> val.id !== id)
        console.log(index)
        // item.slice(index, 1)
    }

    return (
        <section className={style.section}>
            <div className={style.section__wrapper}>
                <div className={style.items}>
                    {item.map((val, i) => (
                        <div key={i} className={style.item__container}>
                            <div className={style.item}>{val.value}</div>
                            <div className={style.actions}>
                                <div
                                    className={style['item__action-subtask']}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div className={style['item__action-info']}>
                                    <svg viewBox="0 0 10 10" className={style.item__remove}>
                                        <path d="M5,2 L5,7" className="p1"/> 
                                        <circle cx="5" cy="8" r="0.6" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div 
                                    onClick={() => removeItem()}
                                    className={style['item__action-remove']}>
                                    <svg viewBox="0 0 10 10" className={style.item__remove}>
                                        <path d="M3,7 L7,3" className="p1"/>
                                        <path d="M3,3 L7,7" className="p3"/> 
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Section;