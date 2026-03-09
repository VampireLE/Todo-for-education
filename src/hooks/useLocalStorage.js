import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = []) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  const getTodo = () => storedValue;

  const addTodo = (newItem) => {
    setStoredValue(prev => [...prev, newItem]);
  };

  const updateTodo = (id, updatedFields) => {
    setStoredValue(prev => 
      prev.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    );
  };

  const deleteTodo = (id) => {
    setStoredValue(prev => prev.filter(item => item.id !== id));
  };

  const clearTodo = () => {
    setStoredValue([]);
  };

  const syncWithExternalState = (externalState) => {
    if (JSON.stringify(externalState) !== JSON.stringify(storedValue)) {
      setStoredValue(externalState);
    }
  };

  return {
    storedValue,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    clearTodo,
    syncWithExternalState
  };
}

export default useLocalStorage;