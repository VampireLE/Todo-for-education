import { useContext, useState } from "react";
import style from "./SectionDone.module.scss";
import { ItemContext } from "../../App";
import SubTask from "../SubTask/SubTask";


function SectionDone() {
  const { 
    filteredItems,
    toggleItemStatus, 
    removeItem,
    openPopup,
    addSubtask
  } = useContext(ItemContext);
  
  const [subtaskPopupOpen, setSubtaskPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleToggleItem = (id) => {
    toggleItemStatus(id);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleEditItem = (task) => {
    openPopup(task);
  };

  const handleOpenSubtaskPopup = (task) => {
    setSelectedTask(task);
    setSubtaskPopupOpen(true);
  };

  const handleCloseSubtaskPopup = () => {
    setSubtaskPopupOpen(false);
    setSelectedTask(null);
  };

  const handleAddSubtask = (subtaskValue) => {
    if (selectedTask && subtaskValue.trim()) {
      addSubtask(selectedTask.id, subtaskValue);
      handleCloseSubtaskPopup();
    }
  };

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <section className={style.section}>
        <div className={style.section__wrapper}>
          <div className={style.empty}>
            <p>Нет выполненных задач</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={style.section}>
      <div className={style.section__wrapper}>
        <div className={style.items}>
          {filteredItems.map((val) => (
            <div key={val.id} className={style.item__container}>
              <div className={style.item}>
                <span className={style['item__title']}>
                  {val.value || 'Без названия'}
                </span>
                {val.date && (
                  <span className={style['item__date']}>
                    {val.date}
                  </span>
                )}
                {val.completedAt && (
                  <span className={style['item__completed']}>
                    Выполнено: {val.completedAt}
                  </span>
                )}
              </div>
              <div className={style.actions}>
                <div
                  onClick={() => handleToggleItem(val.id)}
                  className={`${style['item__action-done']} ${style['item__action-done--completed']}`}
                >
                  ✓ Выполнено
                </div>
                <div
                  className={style['item__action-subtask']}
                  onClick={() => handleOpenSubtaskPopup(val)}
                  title="Добавить подзадачу"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div 
                  className={style['item__action-edit']}
                  onClick={() => handleEditItem(val)}
                  title="Редактировать задачу"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" 
                      stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                  </svg>
                </div>
                <div 
                  onClick={() => handleRemoveItem(val.id)}
                  className={style['item__action-remove']}
                  title="Удалить задачу"
                >
                  <svg viewBox="0 0 10 10" className={style.item__remove}>
                    <path d="M3,7 L7,3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3,3 L7,7" stroke="currentColor" strokeWidth="1.5"/> 
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {subtaskPopupOpen && selectedTask && (
        <SubTask
          task={selectedTask}
          onClose={handleCloseSubtaskPopup}
          onAdd={handleAddSubtask}
        />
      )}
    </section>
  );
}

export default SectionDone;