import { createContext, useState, useMemo } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LayoutDone from './components/LayoutDone/LayoutDone';
import useLocalStorage from './hooks/useLocalStorage';

export const ItemContext = createContext();

function App() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [addTask, setAddTask] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const {
    storedValue: items,
    addTodo,
    deleteTodo,
    updateTodo,
    clearTodo,
  } = useLocalStorage('todos', []);

  const generateId = (length = 25) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  const currentPage = location.pathname === '/done' ? 'done' : 'active';

  const filterByStatus = useMemo(() => {
    if (currentPage === 'done') {
      return items.filter(item => item.status === 'done');
    } else {
      return items.filter(item => item.status === 'active');
    }
  }, [items, currentPage]);

  const filterBySearchInput = useMemo(() => {
    if (!search.trim()) return filterByStatus;
    return filterByStatus.filter((el) => {
      return el && el.value && typeof el.value === 'string' 
        ? el.value.toLowerCase().includes(search.toLowerCase()) 
        : false;
    });
  }, [filterByStatus, search]);

  const ensureString = (value) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && value.value) return String(value.value);
    return String(value || '');
  };

  const addItem = (value, date = '') => {
    
    
    
    const stringValue = ensureString(value);
    if (!stringValue.trim()) return;
    
    const newItem = {
      id: generateId(),
      value: stringValue,
      date: date || '',
      status: 'active',
      completedAt: null,
      createdAt: new Date().toLocaleString("ru", {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      }),
      subtasks: []
    };
    addTodo(newItem);
  };

  const updateItem = (id, updatedFields) => {
    const cleanFields = { ...updatedFields };
    
    if (cleanFields.value !== undefined) {
      cleanFields.value = ensureString(cleanFields.value);
    }
    
    if (cleanFields.subtasks) {
      cleanFields.subtasks = cleanFields.subtasks.map(sub => ({
        ...sub,
        value: ensureString(sub.value)
      }));
    }

    const existingTask = items.find(item => item.id === id);
    if (existingTask) {
      updateTodo(id, { ...existingTask, ...cleanFields });
    }
  };

  const removeItem = (id) => deleteTodo(id);

  const toggleItemStatus = (id) => {
    const task = items.find(t => t.id === id);
    if (task) {
      updateTodo(id, {
        status: task.status === 'active' ? 'done' : 'active',
        completedAt: task.status === 'active' 
          ? new Date().toLocaleString("ru", {
              year: 'numeric', month: 'numeric', day: 'numeric',
              hour: 'numeric', minute: 'numeric', second: 'numeric'
            })
          : null
      });
    }
  };

  const addSubtask = (taskId, subtaskValue) => {
    const stringValue = ensureString(subtaskValue);
    if (!stringValue.trim()) return;
    
    const task = items.find(t => t.id === taskId);
    if (task) {
      const newSubtask = {
        id: generateId(),
        value: stringValue,
        status: 'active'
      };
      updateTodo(taskId, { 
        subtasks: [...(task.subtasks || []), newSubtask] 
      });
    }
  };

  const removeSubtask = (taskId, subtaskId) => {
    const task = items.find(t => t.id === taskId);
    if (task?.subtasks) {
      updateTodo(taskId, { 
        subtasks: task.subtasks.filter(sub => sub.id !== subtaskId) 
      });
    }
  };

  const toggleSubtaskStatus = (taskId, subtaskId) => {
    const task = items.find(t => t.id === taskId);
    if (task?.subtasks) {
      updateTodo(taskId, {
        subtasks: task.subtasks.map(sub =>
          sub.id === subtaskId
            ? { ...sub, status: sub.status === 'active' ? 'done' : 'active' }
            : sub
        )
      });
    }
  };

  const openPopup = (task) => {
    setEditingTask(task);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setEditingTask(null);
    setIsPopupOpen(false);
  };

  const saveTaskChanges = (updatedTask) => {
    updateTodo(updatedTask.id, updatedTask);
    closePopup();
  };

  const setItems = (newItems) => {
    clearTodo();
    if (Array.isArray(newItems)) {
      newItems.forEach(item => {
        const cleanItem = { ...item };
        cleanItem.value = ensureString(cleanItem.value);
        if (cleanItem.subtasks) {
          cleanItem.subtasks = cleanItem.subtasks.map(sub => ({
            ...sub,
            value: ensureString(sub.value)
          }));
        }
        addTodo(cleanItem);
      });
    }
  };

  const contextValue = {
    items,
    filteredItems: filterBySearchInput,
    search, setSearch,
    addTask, setAddTask,
    currentPage,
    isPopupOpen, editingTask, openPopup, closePopup, saveTaskChanges,
    setItems, addItem, toggleItemStatus, removeItem, updateItem,
    addSubtask, removeSubtask, toggleSubtaskStatus,
    generateId, setItem: setItems
  };

  return (
    <ItemContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/done" element={<LayoutDone />} />
      </Routes>
    </ItemContext.Provider>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWithRouter;