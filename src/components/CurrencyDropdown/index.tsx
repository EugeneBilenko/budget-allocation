import React from 'react';
import { useFormikContext } from 'formik';

import { Dropdown } from '../common/dropdown';
import { BudgetAllocationFormType, CURRENCY_OPTIONS, CurrencyValue } from '../../constants/data';
import { twMerge } from 'tailwind-merge';

export const CurrencyDropdown = () => {
	const { values, setFieldValue } = useFormikContext<BudgetAllocationFormType>();

	const heading = ((selectedCurrency: CurrencyValue) => {
		const currencyObj = CURRENCY_OPTIONS.find((curr) => curr.symbol == selectedCurrency);
		if (currencyObj) {
			return `Currency (${currencyObj.symbol} ${currencyObj.name})`;
		}

		return '';
	})(values.currency);

	const handleSelectCurrency = (currency: CurrencyValue) => {
		setFieldValue('currency', currency);
	};

	return (
		<Dropdown
			wrapperClassName="w-full h-full rounded-lg p-3 whitespace-nowrap flex items-center bg-gray-200 min-w-48"
			headerName={heading}
		>
			<ul className="w-full">
				{CURRENCY_OPTIONS.map((option) => (
					<li className="border-b border-gray-200 last:border-none" key={option.name}>
						<button
							onClick={() => handleSelectCurrency(option.symbol)}
							className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
						>
							<span className={twMerge(values.currency === option.symbol && 'text-blue-700')}>
								{option.symbol} {option.name}
							</span>
						</button>
					</li>
				))}
			</ul>
		</Dropdown>
	);
};
