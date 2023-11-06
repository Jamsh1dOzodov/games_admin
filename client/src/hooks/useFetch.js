import { useEffect, useState } from "react"


export const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        setData(null)
        setError(null)
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setData(data)
            setLoading(false)
            setError(null)
        })
        .catch(err => {
            setError(err)
            setLoading(false)
        })
    }, [url])

    return{data, loading, error}
}