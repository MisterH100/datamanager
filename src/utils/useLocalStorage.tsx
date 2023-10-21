import { useEffect, useState } from "react";

export const useLocalStroge = <T,>(key: string, initialValue: T | (()=> T)) =>{
    const [localUser , setLocalUser] = useState<T>(()=>{

        if (typeof localStorage !== 'undefined') {
            const jsonValue = localStorage.getItem(key)
            if(jsonValue != null) return JSON.parse(jsonValue)

        } else if (typeof sessionStorage !== 'undefined') {
            const jsonValue = sessionStorage.getItem(key)
            if(jsonValue != null) return JSON.parse(jsonValue)
        }
        
        if(typeof initialValue === "function"){
            return (initialValue as () => T)()
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(localUser))

        } else if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(key, JSON.stringify(localUser))
        }
    }, [key, localUser])

    return [localUser, setLocalUser] as [typeof localUser, typeof setLocalUser]
}

