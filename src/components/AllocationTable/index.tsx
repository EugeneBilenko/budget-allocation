import React from 'react';
import { useFormikContext } from 'formik';
import { FiMinusCircle, FiPlusCircle, FiXCircle } from 'react-icons/fi';

import { BudgetAllocationFormType } from '../../constants/data';

export const AllocationTable = () => {
	const { values, setFieldValue, setValues } = useFormikContext<BudgetAllocationFormType>();

	const handleIncreaseAllocation = (dep_id: string) => {
		if (values.remaining < 10) {
			alert('Remaining budget is less than 10.');
		} else {
			const newList = values.departments.map((dep) =>
				dep.id !== dep_id
					? dep
					: {
							...dep,
							allocatedBudget: dep.allocatedBudget + 10
						}
			);
			const spent = newList.reduce((acc, curr) => acc + curr.allocatedBudget, 0);
			const remaining = values.budget - spent;

			setValues((prev) => ({
				...prev,
				spent,
				remaining,
				departments: newList
			}));
		}
	};

	const handleDecreaseAllocation = (dep_id: string) => {
		const department = values.departments.find((dep) => dep.id === dep_id);
		if (department) {
			if (department.allocatedBudget <= 10) {
				alert('You cannot reduce allocated value lower or equal to zero.');
			} else {
				const newList = values.departments.map((dep) =>
					dep.id !== dep_id
						? dep
						: {
								...dep,
								allocatedBudget: dep.allocatedBudget - 10
							}
				);
				const spent = newList.reduce((acc, curr) => acc + curr.allocatedBudget, 0);
				const remaining = values.budget - spent;

				setValues((prev) => ({
					...prev,
					remaining,
					spent,
					departments: newList
				}));
			}
		}
	};

	const handleDelete = (dep_id: string) => {
		const newAllocations = values.departments.filter((dep) => dep.id !== dep_id);
		const spent = newAllocations.reduce((acc, curr) => acc + curr.allocatedBudget, 0);
		const remaining = values.budget - spent;

		setValues((prev) => ({
			...prev,
			spent,
			remaining,
			departments: newAllocations
		}));
	};

	return (
		<div>
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
							<td>
								{values.currency}
								{dep.allocatedBudget}
							</td>
							<td>
								<button
									onClick={() => handleIncreaseAllocation(dep.id)}
									className="rounded-full flex items-center justify-center text-green-500"
								>
									<FiPlusCircle size="24px" />
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDecreaseAllocation(dep.id)}
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
