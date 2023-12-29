export const MAX_BUDGET_ALLOCATED = 20_000;

export const DEPARTMENTS = [
	{ name: 'Marketing', allocatedBudget: 0, id: 'marketing_dep' },
	{ name: 'Finance', allocatedBudget: 0, id: 'finance_dep' },
	{ name: 'Sales', allocatedBudget: 0, id: 'sales_dep' },
	{ name: 'Human Resource', allocatedBudget: 0, id: 'hr_dep' },
	{ name: 'IT', allocatedBudget: 0, id: 'it_dep' }
];

export const INIT_FORM_VALUES: BudgetAllocationFormType = {
	budget: 0,
	spent: 0,
	remaining: 0,
	departments: []
};

export type BudgetAllocationFormType = {
	budget: number;
	spent: number;
	remaining: number;
	departments: DepartmentType[];
};

export type DepartmentType = {
	name: string;
	id: string;
	allocatedBudget: number;
};

export const ALLOCATION_ACTIONS = {
	add: 'add',
	remove: 'remove'
};

export type AllocationActionValue = (typeof ALLOCATION_ACTIONS)[keyof typeof ALLOCATION_ACTIONS];

export const ALLOCATION_OPTIONS: { label: string; value: AllocationActionValue }[] = [
	{ label: 'Add', value: ALLOCATION_ACTIONS.add },
	{ label: 'Remove', value: ALLOCATION_ACTIONS.remove }
];
