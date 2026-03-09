import { useContext, useState, useEffect } from "react";
import { ItemContext } from "../../App";
import style from "./Search.module.scss";

function Search() {
  const { search, setSearch, currentPage } = useContext(ItemContext);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearch(value);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearch('');
  };

  // Текст в зависимости от текущей страницы
  const getPlaceholder = () => {
    return currentPage === 'done' 
      ? 'Поиск среди выполненных задач...' 
      : 'Поиск среди активных задач...';
  };

  const getSearchInfo = () => {
    if (!localSearch) return null;
    
    return currentPage === 'done'
      ? `Поиск среди выполненных задач: "${localSearch}"`
      : `Поиск среди активных задач: "${localSearch}"`;
  };

  return (
    <div className={style.search}>
      <div className={style.search__container}>
        <input
          type="text"
          className={style.search__input}
          placeholder={getPlaceholder()}
          value={localSearch}
          onChange={handleSearchChange}
        />
        {localSearch && (
          <button
            className={style.search__clear}
            onClick={handleClearSearch}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
      
      {localSearch && (
        <div className={style.search__info}>
          {getSearchInfo()}
        </div>
      )}
    </div>
  );
}

export default Search;