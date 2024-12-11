import React, { useEffect } from 'react'
import { useValue } from '../../context/ContextProvider'
import { getRooms } from '../../actions/room'

const ClusterMap = () => {
  const {state:{rooms}, dispatch} = useValue()

  useEffect(() => {
    getRooms(dispatch)
  }, [])

  useEffect(()=>{
    console.log(rooms)
  },[rooms])

  return (
    <div>
      Clisyterre
    </div>
    
  )
}

export default ClusterMap
