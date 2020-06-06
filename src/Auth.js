import React from 'react'
import { useEffect, useState} from 'react'

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('currentUser'))

    useEffect(()=>{
    },  [])
    return(
        <AuthContext.Provider value = {[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    )
}