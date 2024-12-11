import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + '/room';

export const createRoom =async (room, currentUser, dispatch, setPage) =>{
    // if (!currentUser || !currentUser.result || !currentUser.result.token) {
    //     dispatch({
    //         type: 'UPDATE_ALERT',
    //         payload: { open: true, message: 'You are not logged in!', severity: "error" }
    //     });
    //     return; 
    // }
    dispatch({type:'START_LOADING'})
    const result = await fetchData({url, method:'POST', body:room, token:currentUser.result.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALERT', payload:{open: true, message: 'Room created successfully', severity: "success" } })
        dispatch({type:'RESET_ROOM'})
        setPage(0); 
    }
    dispatch({type:'END_LOADING'})

}

export const getRooms =async (dispatch) =>{
    const result = await fetchData({url, method:'GET'}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ROOMS', payload: result})
    }
}