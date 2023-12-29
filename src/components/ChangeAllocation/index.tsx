import React, { ChangeEvent, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';
import { twMerge } from 'tailwind-merge';

import { Dropdown } from '../common/dropdown';
import {
	ALLOCATION_ACTIONS,
	ALLOCATION_OPTIONS,
	BudgetAllocationFormType,
	DEPARTMENTS,
	MAX_BUDGET_ALLOCATED
} from '../../constants/data';

export const ChangeAllocation = () => {
	const [selectedAction, setSelectedAction] = useState(() => ALLOCATION_OPTIONS[0].value);
	const [selectedDepartment, setSelectedDepartment] = useState('');

	const { values, setValues } = useFormikContext<BudgetAllocationFormType>();

	const [allocationInput, setAllocationInput] = useState(() => {
		const department = values.departments.find((dep) => dep.id === selectedDepartment);
		if (department) {
			return department.allocatedBudget;
		}

		return 0;
	});

	const allocationHeading = ALLOCATION_OPTIONS.find((opt) => opt.value === selectedAction)?.label ?? 'add/remove';
	const departmentHeading = DEPARTMENTS.find((dep) => dep.id === selectedDepartment)?.name ?? 'Choose department';

	const handleActionSelect = (value: string) => {
		setSelectedAction(value);
	};
	const handleDepartmentSelect = (value: string) => {
		if (value === selectedDepartment) {
			return;
		}

		setAllocationInput(0);
		setSelectedDepartment(value);
	};

	const handleAllocationInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (selectedAction === ALLOCATION_ACTIONS.add) {
			if (+event.target.value > values.budget) {
				alert('You cannot set value higher than the budget.');
				return;
			} else if (+event.target.value > values.remaining) {
				alert('You cannot set value higher than remaining budget.');
				return;
			}
		} else {
			const department = values.departments.find((dep) => dep.id === selectedDepartment);
			if (!department) {
				alert('You cannot decrease value of not allocated department.');
				return;
			}
			if (department) {
				if (+event.target.value > department.allocatedBudget) {
					alert('You cannot decrease value more than allocated');
					return;
				}
			}
		}
		setAllocationInput(+event.target.value);
	};

	const isValid = useMemo(() => {
		if (selectedDepartment === '') {
			return false;
		}
		const department = values.departments.find((dep) => dep.id === selectedDepartment);

		if (department) {
			if (selectedAction === ALLOCATION_ACTIONS.remove) {
				return allocationInput > 0 && allocationInput < department.allocatedBudget;
			}
		}

		return (
			allocationInput <= values.budget &&
			allocationInput <= values.remaining &&
			allocationInput <= MAX_BUDGET_ALLOCATED &&
			allocationInput > 0
		);
	}, [values, selectedDepartment, selectedAction, allocationInput]);

	const handleSave = () => {
		const department = DEPARTMENTS.find((dep) => dep.id === selectedDepartment);
		const isDepAllocated = values.departments.findIndex((dep) => dep.id === selectedDepartment) >= 0;

		if (department) {
			if (isDepAllocated) {
				const newList = values.departments.map((dep) =>
					dep.id !== selectedDepartment
						? dep
						: {
								...dep,
								allocatedBudget:
									selectedAction === ALLOCATION_ACTIONS.add
										? dep.allocatedBudget + +allocationInput
										: dep.allocatedBudget - +allocationInput
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
			} else {
				const updatedInfo = { ...department, allocatedBudget: allocationInput };
				const newList = [...values.departments, updatedInfo];
				const spent = newList.reduce((acc, curr) => acc + curr.allocatedBudget, 0);
				const remaining = values.budget - spent;

				setValues((prev) => ({
					...prev,
					spent,
					remaining,
					departments: newList
				}));
			}
		}

		setAllocationInput(0);
	};

	return (
		<div>
			<h2 className="text-xl font-semibold">Change Allocation</h2>
			<div className="flex items-stretch gap-x-4 mt-2">
				<div className="flex items-stretch">
					<div className="p-2 bg-gray-200 rounded-l-lg">Department</div>
					<Dropdown headerName={departmentHeading} wrapperClassName="p-2 border border-gray-300 rounded-r-lg min-w-48">
						<ul className="w-full">
							{DEPARTMENTS.map((dep) => (
								<li className="border-b border-gray-200 last:border-none" key={dep.id}>
									<button
										onClick={() => handleDepartmentSelect(dep.id)}
										className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
									>
										<span className={twMerge(selectedDepartment === dep.id && 'text-blue-700')}>{dep.name}</span>
									</button>
								</li>
							))}
						</ul>
					</Dropdown>
				</div>
				<div className="flex items-stretch">
					<div className="p-2 bg-gray-200 rounded-l-lg">Allocation</div>
					<Dropdown headerName={allocationHeading} wrapperClassName="p-2 border border-gray-300 rounded-r-lg min-w-28">
						<ul className="w-full">
							{ALLOCATION_OPTIONS.map((option) => (
								<li className="border-b border-gray-200 last:border-none" key={option.value}>
									<button
										onClick={() => handleActionSelect(option.value)}
										className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
									>
										<span className={twMerge(selectedAction === option.value && 'text-blue-700')}>{option.label}</span>
									</button>
								</li>
							))}
						</ul>
					</Dropdown>
				</div>
				<div className="flex items-stretch text-center">
					<div className="flex items-center mr-1">
						<p>{values.currency}</p>
					</div>
					<input
						type="number"
						min={0}
						step={10}
						value={allocationInput}
						onChange={handleAllocationInputChange}
						className="rounded-lg py-1 px-2 border border-gray-400 min-w-24"
					/>
				</div>

				<button
					disabled={!isValid}
					onClick={handleSave}
					className="px-4 rounded-lg bg-blue-500 disabled:bg-blue-500/50 hover:bg-blue-600 transition-colors duration-200"
				>
					<span className="text-white capitalize">save</span>
				</button>
			</div>
		</div>
	);
};
