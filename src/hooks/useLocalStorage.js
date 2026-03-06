import { useCallback, useEffect, useState } from "react";

function useLocalStorage(initialState=[]) {

    const [actions, setActions] = useState(initialState);

    const getTodo = useCallback((key) => {
        const item = localStorage.getItem(key);
        if (!item) throw new Error('key not found')
    })

    const addTodo = useCallback((key, value) => {
        localStorage.setItem(key, value)
    })

    const updateTodo = useCallback((text) => {

    })

    const deleteTodo = useCallback((text) => {

    })

    const clearTodo = useCallback((text) => {
        return initialState
    })

    return {
        getTodo,
        addTodo,
        updateTodo,
        deleteTodo,
        clearTodo
    }


    // useEffect(() => {
        
    //     localStorage.getItem(key)
    //     localStorage.setItem(key, initialValue)
    // }, [])
}

export default useLocalStorage;