import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => setCurrentUser(user))
        return unSubscribe
    }, [])


    const signUp = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
    }
    const logIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
    }

    const logOut = () => {
        return auth.signOut()
    }

    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const updateEmail = (email) => {
        console.log("current user", currentUser);
        currentUser.updateEmail(email)
    }
    const updatePassword = (pasword) => {
        currentUser.updatePassword(pasword)
    }

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        forgotPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

