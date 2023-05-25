import { useState, useEffect } from 'react'

export function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState("")

    useEffect(()=>{
        let value = localStorage.getItem(key) || defaultValue
        // console.log(`get : ${key} = ${value}`)
        setState(value)
    }, []);

    const setLocalStorage = (newValue) => {
        // console.log(`set : ${key} = ${newValue}`)
        localStorage.setItem(key, newValue)
        setState(newValue)
    }

    const delLocalStorage = () => {
        if(confirm("Confirm to delete all data ?")){
            localStorage.clear();
        }
    }
    
    return [state, setLocalStorage]
    // const [state, setState] = useState(() => {
    //     try {
    //         const value = window.localStorage.getItem(key)
    //         return value ? JSON.parse(value) : defaultValue
    //     } catch (error) {
    //         console.log(error)
    //     }
    // });

    // const setValue = (newValue) => {
    //     try {
    //         window.localStorage.setItem(key, JSON.stringify(newValue))
    //         setState(value)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // return [state, setValue]
}

