import React, { ChangeEvent, useEffect, useState } from 'react';
import { BudgetAllocationFormType } from '../../constants/data';
import { useFormikContext } from 'formik';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const BudgetInput = () => {
	const { values, setFieldValue, handleBlur } = useFormikContext<BudgetAllocationFormType>();
	const [input, setInput] = useState(() => values.budget);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInput(+event.target.value);
	};

	const debouncedValue = useDebouncedValue<number>(input, 600);

	useEffect(() => {
		if (debouncedValue < values.spent) {
			alert('You cannot reduce the budget lower than the spending');
			setInput(values.budget);
		} else {
			setFieldValue('budget', debouncedValue);
			setFieldValue('remaining', debouncedValue - values.spent);
		}
	}, [debouncedValue]);

	return (
		<div className="w-full whitespace-nowrap px-3 py-1 rounded-lg bg-gray-200 flex items-center">
			<span>Budget: {values.currency}</span>
			<input
				type="number"
				name="budget"
				min={0}
				step={10}
				value={input}
				onChange={handleInputChange}
				onBlur={handleBlur}
				className="rounded-lg py-1 px-2 border border-gray-400 min-w-24"
			/>
		</div>
	);
};
