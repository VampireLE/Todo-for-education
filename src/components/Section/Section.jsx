import { useContext } from "react";
import style from "./Section.module.scss"
import { ItemContext } from "../../App";

function Section() {
    const {filteredItem, setItem} = useContext(ItemContext);

    const removeItem = (id) => {
        if (filteredItem.length < 1) return
        const newItems = filteredItem.filter((val) => val.id !== id)
        setItem(newItems)
    }

    const toggleItem = (id, status) => {
        if (filteredItem.length < 1) return
        if (status === 'active') {
            status = 'done'
        } else {
            status
        }

        const newItem = filteredItem.filter((val) => val.id === id)
        setItem(prev => [{...prev, 'status': status}])
    }

    console.log(filteredItem)
    const updateItem = (id, name) => {
        if (item.length < 1) return
    }

    return (
        <section className={style.section}>
            <div className={style.section__wrapper}>
                <div className={style.items}>
                    {filteredItem.map((val, i) => (
                        <div key={i} className={style.item__container}>
                            <div className={style.item}>{val.value} {val.date}</div>
                            <div className={style.actions}>
                                <div
                                    onClick={() => toggleItem(val.id, val.status)}
                                    className={style['item__action-done']}>
                                        Done
                                </div>
                                <div
                                    className={style['item__action-subtask']}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div className={style['item__action-info']}>
                                    <svg viewBox="0 0 10 10" className={style.item__remove}>
                                        <path d="M5,2 L5,7" className="p1"/> 
                                        <circle cx="5" cy="8" r="0.6" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div 
                                    onClick={() => removeItem(val.id)}
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