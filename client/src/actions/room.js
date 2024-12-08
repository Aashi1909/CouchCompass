import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + '/room';

export const createRoom =async (room, currentUser, dispatch) =>{
    dispatch({type:'START_LOADING'})
    const result = await fetchData({url, method:'POST', body:room, token:currentUser?.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALERT', payload:{open: true, message: 'Room created successfully', severity: "success" } })
    }
    dispatch({type:'END_LOADING'})

}