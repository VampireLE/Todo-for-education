import { useContext } from "react";
import style from "./Search.module.scss"
import { ItemContext } from "../../App";

function Search() {
    const {setSearch} = useContext(ItemContext);
    return (
        <div className={style.search}>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search by item name"/>
        </div>
    )
}

export default Search;