import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + '/room';

export const createRoom =async (room, currentUser, dispatch) =>{
    dispatch({type:'START_LOADING'})
    console.log(currentUser.result.token, "CREATING ROOM")
    const result = await fetchData({url, method:'POST', body:room, token:currentUser.result.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALERT', payload:{open: true, message: 'Room created successfully', severity: "success" } })
    }
    dispatch({type:'END_LOADING'})

}