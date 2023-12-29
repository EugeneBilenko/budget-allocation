import React from 'react';
import { useFormikContext } from 'formik';
import { FiMinusCircle, FiPlusCircle, FiXCircle } from 'react-icons/fi';

import { BudgetAllocationFormType } from '../../constants/data';

export const AllocationTable = () => {
	const { values, setFieldValue } = useFormikContext<BudgetAllocationFormType>();

	const handleIncreaseAllocation = () => {
		const remaining = (values.budget = values.spent);
		if (remaining < 10) {
			alert('Remaining budget is less than 10.');
		}
	};

	const handleDecreaseAllocation = (allocated: number) => {
		if (allocated < 10) {
			alert('Can`t assign negative value.');
		}
	};

	const handleDelete = (dep_id: string) => {
		const newAllocations = values.departments.filter((dep) => dep.id !== dep_id);
		setFieldValue('departments', newAllocations);
	};

	return (
		<div className="mt-5">
			<h2 className="text-xl font-semibold">Allocation</h2>
			<table className="w-full">
				<thead>
					<tr className="text-left">
						<th>Department</th>
						<th>Allocated Budget</th>
						<th>Increase by 10</th>
						<th>Decrease by 10</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{values.departments.map((dep) => (
						<tr key={dep.id}>
							<td>{dep.name}</td>
							<td>${dep.allocatedBudget}</td>
							<td>
								<button
									onClick={handleIncreaseAllocation}
									className="rounded-full flex items-center justify-center text-green-500"
								>
									<FiPlusCircle size="24px" />
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDecreaseAllocation(dep.allocatedBudget)}
									className="rounded-full flex items-center justify-center text-red-500"
								>
									<FiMinusCircle size="24px" />
								</button>
							</td>
							<td>
								<button onClick={() => handleDelete(dep.id)} className="rounded-full flex items-center justify-center">
									<FiXCircle size="24px" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
