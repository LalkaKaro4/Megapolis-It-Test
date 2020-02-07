import { useState, useEffect } from "react";

interface IFetch<T> {
	isLoading: boolean;
	data: T | undefined;
}

function useFetch<T>(url: string, initialState?: IFetch<T>): IFetch<T> {

	const [isLoading, setIsLoading] = useState(initialState?.isLoading || true);
	const [data, setData] = useState(initialState?.data);

	useEffect(() => {

		fetch(url)
			.then(res => res.json())
			.then(json => setData(json as T))
			.then(() => setIsLoading(false))
			.catch(() => setIsLoading(false));

	}, [url]);

	return {
		isLoading,
		data
	};
}

export { useFetch };