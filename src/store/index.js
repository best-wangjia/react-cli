import React, { useEffect, useReducer, createContext } from 'react'
import { init, reducer } from './reducer'

const Context = createContext()

const Provider = (props) => {

  const [state, dispatch] = useReducer(reducer, {}, init)

  useEffect(() => {
    sessionStorage['store_persist'] = JSON.stringify(state)
  }, [state])

  return (
    <Context.Provider value={{state, dispatch}}>
      { props.children }
    </Context.Provider>
  )
}

export { Context, Provider }
