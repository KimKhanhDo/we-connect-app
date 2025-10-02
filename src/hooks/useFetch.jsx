import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

function useFetch(
    { url = "", method = "GET", headers = {} },
    { enabled } = { enabled: true },
) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (enabled) {
            setIsLoading(true);

            fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
                method,
                headers: {
                    ...DEFAULT_HEADERS,
                    ...headers,
                },
            })
                .then(async (res) => {
                    const data = await res.json();
                    setData(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, method, JSON.stringify(headers), enabled]);

    return { isLoading, data };
}

export default useFetch;

// before having useFetch function
// useEffect(() => {
//     setIsLoading(true);

//     fetch(
//         `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
//         {
//             method: "GET",
//             headers: {
//                 accept: "application/json",
//                 Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//             },
//         },
//     )
//         .then(async (res) => {
//             const data = await res.json();
//             setMovieInfo(data);
//         })
//         .catch((err) => console.log(err))
//         .finally(() => setIsLoading(false));
// }, [id]);
