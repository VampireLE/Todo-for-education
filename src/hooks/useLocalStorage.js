import { useEffect } from "react";

function useLocalStorage(key, initialValue) {
    useEffect(() => {
        localStorage.setItem(key, initialValue)
    }, [])
}

export default useLocalStorage;