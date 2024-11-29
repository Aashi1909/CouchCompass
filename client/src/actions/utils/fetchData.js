const fetchData = async ({url, method='POST',token='' ,body=null}, dispatch) => {
    const headers = body instanceof FormData
    ? {}
    : token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };

  const options = body instanceof FormData
    ? { method, headers, body } // Send FormData directly
    : { method, headers, body: body ? JSON.stringify(body) : null };

    try{
        const response = await fetch(url, options);
        const data = await response.json();
        if(!data.success){
            if(response.status===401)
                dispatch({type:"UPDATE_USER", payload: null})
            throw new Error(data.message)
            
        }
        return data.result
    }catch(error){
        dispatch({type:"UPDATE_ALERT", payload:{open: true, message: error.message, severity: "error" } })
        return null
    }

    
}
export default fetchData