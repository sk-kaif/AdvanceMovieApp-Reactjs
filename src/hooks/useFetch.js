import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        const fetchHookFun =async()=>{
            try {
                const res = await fetchDataFromApi(url)
                setLoading(false)
                setData(res)
                
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("Something went wrong!");
            }
        }
        fetchHookFun()
        
        
    }, [url]);

    return { data, loading, error };
};

export default useFetch;