import { useContext, useState, useEffect } from "react";
import { ItemContext } from "../../App";
import style from "./Popup.module.scss";

function Popup() {
  const { isPopupOpen, editingTask, closePopup, saveTaskChanges } = useContext(ItemContext);
  
  const [taskValue, setTaskValue] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  // Загружаем данные задачи при открытии попапа
  useEffect(() => {
    if (editingTask) {
      setTaskValue(editingTask.value || '');
      setTaskDate(editingTask.date || '');
      setSubtasks(editingTask.subtasks || []);
    }
  }, [editingTask]);

  const handleSave = () => {
    if (!taskValue.trim()) {
      alert('Введите название задачи');
      return;
    }

    const updatedTask = {
      ...editingTask,
      value: taskValue,
      date: taskDate,
      subtasks: subtasks
    };

    saveTaskChanges(updatedTask);
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    
    const newSubtaskObj = {
      id: Date.now().toString(), // временный ID
      value: newSubtask,
      status: 'active'
    };
    
    setSubtasks([...subtasks, newSubtaskObj]);
    setNewSubtask('');
  };

  const handleRemoveSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter(sub => sub.id !== subtaskId));
  };

  const handleSubtaskChange = (subtaskId, newValue) => {
    setSubtasks(subtasks.map(sub => 
      sub.id === subtaskId ? { ...sub, value: newValue } : sub
    ));
  };

  if (!isPopupOpen || !editingTask) return null;

  return (
    <div className={style.popup__background} onClick={closePopup}>
      <div className={style.popup} onClick={(e) => e.stopPropagation()}>
        <div className={style.popup__wrapper}>
          <h2 className={style.popup__title}>Редактирование задачи</h2>
          
          <div className={style.popup__field}>
            <label className={style.popup__label}>Название задачи:</label>
            <input 
              type="text" 
              className={style.popup__input}
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              placeholder="Введите название задачи"
            />
          </div>
          
          <div className={style.popup__field}>
            <label className={style.popup__label}>Дата и время:</label>
            <input 
              type="text" 
              className={style.popup__input}
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              placeholder="Дата и время"
            />
          </div>
          
          <div className={style.popup__field}>
            <label className={style.popup__label}>Подзадачи:</label>
            <div className={style.popup__subtasks}>
              {subtasks.map((subtask) => (
                <div key={subtask.id} className={style.popup__subtask}>
                  <input
                    type="text"
                    className={style.popup__subtaskInput}
                    value={subtask.value}
                    onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
                    placeholder="Название подзадачи"
                  />
                  <button
                    className={style.popup__removeSubtask}
                    onClick={() => handleRemoveSubtask(subtask.id)}
                    title="Удалить подзадачу"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <div className={style.popup__addSubtask}>
                <input
                  type="text"
                  className={style.popup__subtaskInput}
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Новая подзадача"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                />
                <button
                  className={style.popup__addButton}
                  onClick={handleAddSubtask}
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
          
          <div className={style.popup__info}>
            <p>Создано: {editingTask.createdAt}</p>
            {editingTask.completedAt && (
              <p>Выполнено: {editingTask.completedAt}</p>
            )}
          </div>
          
          <div className={style.popup__actions}>
            <button 
              className={style.popup__button}
              onClick={handleSave}
            >
              Сохранить
            </button>
            <button 
              className={`${style.popup__button} ${style.popup__buttonCancel}`}
              onClick={closePopup}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;