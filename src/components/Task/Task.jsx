import { useState } from "react";
import style from "./Task.module.scss";

function Task({ task, onToggle, onRemove, onEdit, onAddSubtask, onRemoveSubtask }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [taskDate, setTaskDate] = useState(task.date || '');
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editingSubtaskValue, setEditingSubtaskValue] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddDate = () => {
    setShowDateInput(true);
  };

  const handleSaveDate = () => {
    if (taskDate) {
      onEdit(task.id, { date: taskDate });
      setShowDateInput(false);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onAddSubtask(task.id, newSubtask);
      setNewSubtask('');
      setShowAddSubtask(false);
    }
  };

  const handleEditSubtask = (subtaskId, currentValue) => {
    setEditingSubtaskId(subtaskId);
    setEditingSubtaskValue(currentValue);
  };

  const handleSaveSubtaskEdit = (subtaskId) => {
    if (editingSubtaskValue.trim()) {
      const updatedSubtasks = task.subtasks.map(sub => 
        sub.id === subtaskId 
          ? { ...sub, value: editingSubtaskValue }
          : sub
      );
      onEdit(task.id, { subtasks: updatedSubtasks });
      setEditingSubtaskId(null);
      setEditingSubtaskValue('');
    }
  };

  return (
    <div className={style.task__container}>
      <div className={style.task__header}>
        <div className={style.task__main}>
          <span className={style.task__title}>
            {task?.value?.value || 'Без названия'}
          </span>
          {task.date && (
            <span className={style.task__date}>
              {task.date}
            </span>
          )}
          <span className={style.task__created}>
            {task.createdAt}
          </span>
        </div>
        
        <div className={style.task__actions}>
          <button
            onClick={() => onToggle(task.id)}
            className={`${style.task__action} ${style['task__action-done']}`}
          >
            {task.status === 'done' ? '✓' : 'Done'}
          </button>
          
          <button
            onClick={toggleExpand}
            className={`${style.task__action} ${style['task__action-expand']} ${isExpanded ? style.expanded : ''}`}
            title="Подробнее"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d={isExpanded 
                ? "M7 14l5-5 5 5" 
                : "M7 10l5 5 5-5"} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          </button>
          
          <button
            onClick={() => onEdit(task.id, { value: task?.value?.value })}
            className={`${style.task__action} ${style['task__action-edit']}`}
            title="Редактировать"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" 
                fill="currentColor"/>
            </svg>
          </button>
          
          <button
            onClick={() => onRemove(task.id)}
            className={`${style.task__action} ${style['task__action-remove']}`}
            title="Удалить"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" 
                fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={style.task__details}>
          {!showDateInput ? (
            <button
              onClick={handleAddDate}
              className={style.task__addDate}
            >
              + Добавить дату и время
            </button>
          ) : (
            <div className={style.task__dateInput}>
              <input
                type="datetime-local"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className={style.task__dateField}
              />
              <button
                onClick={handleSaveDate}
                className={style.task__saveDate}
              >
                Сохранить
              </button>
            </div>
          )}

          <div className={style.task__subtasks}>
            <h4 className={style.task__subtasksTitle}>Подзадачи:</h4>
            
            {task.subtasks?.map((subtask) => (
              <div key={subtask.id} className={style.task__subtask}>
                {editingSubtaskId === subtask.id ? (
                  <>
                    <input
                      type="text"
                      value={editingSubtaskValue}
                      onChange={(e) => setEditingSubtaskValue(e.target.value)}
                      className={style.task__subtaskInput}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveSubtaskEdit(subtask.id)}
                      className={style.task__subtaskSave}
                    >
                      ✓
                    </button>
                  </>
                ) : (
                  <>
                    <span 
                      className={style.task__subtaskText}
                      onDoubleClick={() => handleEditSubtask(subtask.id, subtask.value.value)}
                    >
                      {subtask.value.value}
                    </span>
                    <button
                      onClick={() => onRemoveSubtask(task.id, subtask.id)}
                      className={style.task__subtaskRemove}
                      title="Удалить подзадачу"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}

            {!showAddSubtask ? (
              <button
                onClick={() => setShowAddSubtask(true)}
                className={style.task__addSubtask}
              >
                + Добавить подзадачу
              </button>
            ) : (
              <div className={style.task__addSubtaskForm}>
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Название подзадачи"
                  className={style.task__subtaskInput}
                  autoFocus
                />
                <button
                  onClick={handleAddSubtask}
                  className={style.task__subtaskAdd}
                >
                  Добавить
                </button>
                <button
                  onClick={() => setShowAddSubtask(false)}
                  className={style.task__subtaskCancel}
                >
                  Отмена
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;