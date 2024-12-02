const fetchData = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
    // Set headers for the request
    const headers = body instanceof FormData
      ? {}  // No need to set Content-Type when using FormData
      : token
      ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' };
  
    // Prepare the options for fetch request
    const options = body instanceof FormData
      ? { method, headers, body }  // Directly send FormData
      : { method, headers, body: body ? JSON.stringify(body) : null };  // JSON request body
  
    try {
      // Send the fetch request
      const response = await fetch(url, options);
      
      // Check if the response is okay (status 200-299)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      // Parse the response body
      const data = await response.json();
      console.log(data, "DATA")
  
      // If the response indicates failure, handle errors
      if (!data.success) {
        if (response.status === 401) {
          dispatch({ type: "UPDATE_USER", payload: null });
        }
        throw new Error(data.message);
      }
  
      // Return the result if successful
      return data.result;
    } catch (error) {
      // Dispatch error alert in case of failure
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, message: error.message, severity: "error" },
      });
  
      return null; // Return null if there's an error
    }
  };
  
  export default fetchData;
  