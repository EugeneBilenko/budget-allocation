import React from 'react';
import { Formik } from 'formik';

import { Layout } from './components/common/layout';
import { AllocationTable } from './components/AllocationTable';

import { INIT_FORM_VALUES } from './constants/data';
import { ChangeAllocation } from './components/ChangeAllocation';
import { BudgetInput } from './components/BudgetInput';
import { CurrencyDropdown } from './components/CurrencyDropdown';

function App() {
	return (
		<Layout>
			<div className="flex justify-center h-screen pt-24">
				<div className="p-4">
					<h1 className="text-3xl font-semibold">Company's Budget Allocation</h1>
					<Formik initialValues={INIT_FORM_VALUES} onSubmit={() => {}}>
						{({ values, setFieldValue, handleBlur }) => (
							<div className="flex flex-col gap-y-5 mt-3">
								<div className="flex items-stretch justify-between gap-x-4">
									<BudgetInput />

									<div className="w-full p-3 rounded-lg bg-green-200 flex items-center justify-between gap-x-1 text-green-800">
										<span>Remaining:</span>
										<span className="font-semibold">
											{values.currency}
											{values.remaining}
										</span>
									</div>
									<div className="w-full p-3 rounded-lg bg-blue-200 flex items-center justify-between gap-x-1 text-blue-700 whitespace-nowrap">
										<span>Spent so far:</span>
										<span className="font-semibold">
											{values.currency}
											{values.spent}
										</span>
									</div>
									<CurrencyDropdown />
								</div>

								<AllocationTable />
								<ChangeAllocation />
							</div>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
}

export default App;
