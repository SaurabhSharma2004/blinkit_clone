import {useState, useEffect} from 'react'

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const [timer, setTimer] = useState(null)
    useEffect(() => {
        if (timer) {
            clearTimeout(timer)
        }
        const newTimer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        setTimer(newTimer)
    }, [value, delay])
    return debouncedValue
}
