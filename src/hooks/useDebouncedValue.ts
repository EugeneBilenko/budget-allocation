import { useEffect, useState } from 'react';

/**
 * custom hook to return debounced value.
 * */
export const useDebouncedValue = <T>(value: T, delay: number = 300) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
