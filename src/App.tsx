import React from 'react';
import { Formik } from 'formik';

import { Layout } from './components/layout';
import { AllocationTable } from './components/AllocationTable';

import { INIT_FORM_VALUES, MAX_BUDGET_ALLOCATED } from './constants/data';

function App() {
	return (
		<Layout>
			<div className="flex justify-center h-screen pt-24">
				<div className="p-4">
					<h1 className="text-3xl font-semibold">Company's Budget Allocation</h1>
					<Formik initialValues={INIT_FORM_VALUES} onSubmit={() => {}}>
						{({ values, setFieldValue, handleBlur }) => (
							<>
								<div className="flex items-stretch justify-between gap-x-4 mt-2">
									<div className="p-3 rounded-lg bg-gray-200 flex items-center">
										<span>Budget: $</span>
										{/* todo: currency sign */}
										<input
											type="number"
											name="budget"
											min={0}
											step={10}
											value={values.budget}
											onChange={(event) => {
												if (+event.target.value <= MAX_BUDGET_ALLOCATED) {
													setFieldValue('budget', +event.target.value);
												} else {
													alert('The upper limit is set to 20,000');
												}
											}}
											onBlur={handleBlur}
											className="rounded-lg py-1 px-2 border border-gray-400 min-w-24"
										/>
									</div>
									<div className="p-3 rounded-lg bg-green-200 flex items-center gap-x-1 text-green-800">
										<span>Remaining:</span>
										{/* todo: currency sign */}
										<span className="font-semibold">${values.budget - values.spent}</span>
									</div>
									<div className="p-3 rounded-lg bg-blue-200 flex items-center gap-x-1 text-blue-700">
										<span>Spent so far:</span>
										<span className="font-semibold">${values.spent}</span>
									</div>
									<div className="p-3 rounded-lg bg-gray-200">
										<span>checkbox</span>
									</div>
								</div>

								<AllocationTable />
							</>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
}

export default App;
