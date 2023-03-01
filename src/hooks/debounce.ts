import {useEffect, useState} from 'react';

export const useDebounce = (value: string, delay: number = 300): string => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        let timerId = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timerId)
    }, [value, delay])

    return debounced
}