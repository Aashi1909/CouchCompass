import { createContext, useContext, useReducer, useEffect } from "react"
import reducer from "./reducer"

const initialState = {
    currentUser: null,
    openLogin: false,
    loading :false,
    alert: {open: false, severity: 'info', message: ''},
    profile :{open: false, file:null, photoURL:''},
    images:  [],
    details:{title:'', description:'', price:0},
    location: { lng: 0, lat: 0 },
    rooms: [],

}
const Context = createContext(initialState)
export const useValue = () =>{
    return useContext(Context)
}
const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser) 
          dispatch({type:'UPDATE_USER', payload: currentUser})
    }, [])
  return (
    <Context.Provider value={{state, dispatch}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider
