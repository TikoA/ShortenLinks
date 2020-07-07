import {useCallback, useEffect, useState} from "react";

const Storagename = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setready] = useState(false)
    const [userId,setuserId] = useState(null)

    const login = useCallback((jwtToken,id) => {
        setToken(jwtToken)
        setuserId(id)

        localStorage.setItem(Storagename, JSON.stringify({
            userId : id, token : jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setuserId(null)
        localStorage.removeItem(Storagename)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(Storagename))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setready(true)
    },[login])

    return {login,logout,token,userId, ready}
}