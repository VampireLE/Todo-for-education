import { useState } from "react";
import style from "./Subtask.module.scss";

function SubTask({ task, onClose, onAdd }) {
  const [subtaskValue, setSubtaskValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subtaskValue.trim()) {
      onAdd(subtaskValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className={style.popup__background} onClick={onClose}>
      <div className={style.popup} onClick={(e) => e.stopPropagation()}>
        <div className={style.popup__wrapper}>
          <h2 className={style.popup__title}>Добавление подзадачи</h2>
          
          <div className={style.popup__taskInfo}>
            <span className={style.popup__taskLabel}>К задаче:</span>
            <span className={style.popup__taskTitle}>{task.value}</span>
          </div>
          
          <form onSubmit={handleSubmit} className={style.popup__form}>
            <div className={style.popup__field}>
              <label className={style.popup__label}>Название подзадачи:</label>
              <input 
                type="text" 
                className={style.popup__input}
                value={subtaskValue}
                onChange={(e) => setSubtaskValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите название подзадачи"
                autoFocus
              />
            </div>
            
            <div className={style.popup__actions}>
              <button 
                type="submit"
                className={style.popup__button}
                disabled={!subtaskValue.trim()}
              >
                Добавить
              </button>
              <button 
                type="button"
                className={`${style.popup__button} ${style.popup__buttonCancel}`}
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubTask;