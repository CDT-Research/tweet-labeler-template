import {createContext, useReducer, useState, useEffect} from 'react'
import {projectAuth} from '../firebase/config'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type){
    case 'LOGIN':
      return {...state, user:action.payload}

    case 'LOGOUT':
      return {...state, user: null}

    case 'AUTH_READY':
      return {...state, user:action.payload, authIsReady:true}

    default:
      return state
  }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {user:null, authIsReady:false})

  useEffect(() => {
    const unSub = projectAuth.onAuthStateChanged((user) => {
      dispatch({type: 'AUTH_READY', payload: user})
      unSub()
    })
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
