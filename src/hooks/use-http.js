import { useState, useCallback } from "react";
const useHttp = ()=>{

    console.log('inside useHttp');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (requestConfig, apply) =>{
        setIsLoading(true);
        try
        {
            const response = await fetch(requestConfig.api,{
                method : requestConfig.method ? requestConfig.method : 'GET',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                header: requestConfig.header ? requestConfig.header : {}
            });

            if (!response.ok) {
                throw new Error('Request failed!');
              }

            const data = await response.json();
            setIsLoading(false);
            setError(false);
            apply(data);
        }
        catch(err)
        {
            console.log('inside catch block in use-http.js');
            const data = err;
            setIsLoading(false);
            setError(true);
            //apply(data);
        }
    },[]);

    return {isLoading, error, request};
}

export default useHttp;