// custom hook useFetch created to fetch data from server
// we use a combination of clean up function + abortController to stop the fetch request while it is running when we change the page before the fetch completes or in other words before the component in use unmounts

import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        // we create an abortController and associate it with a fetch request so that we can abort/stop the fetch request. 
        const abortCont = new AbortController(); 

        // associating abortCont with fetch using a second argument to fetch
        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if(!res.ok) {
                throw Error('count not fetch data from resource! Try again later..')
            }
            return res.json()
        }).then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
            // when aborting a fetch request, it throws an error of its own and we catch that error below but stillupdating the state. So we only need to update the state if the error is not an 
            // abort error. If it is an abort error we recognise it and log it in the console. If it is any other erro like network or server error, we want the user to know so we print out the error msg. 
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('fetch aborted!');
            }
            else{
                setIsPending(false);
                setError(err.message);
            }
        })

        // clean up function fires when the component using the useFetch hook unmounts. At this point we want to stop the fetch and prevent updating of state which gives the error. We do this using abortController.
        // we abort whatever fetch is associated with the abortCont using the .abort() method. 
        return () => abortCont.abort();
    }, [url])
    
    return {data, isPending, error};
}
 
export default useFetch;