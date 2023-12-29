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
	departments: DEPARTMENTS
};

export type BudgetAllocationFormType = {
	budget: number;
	spent: number;
	departments: {
		name: string;
		id: string;
		allocatedBudget: number;
	}[];
};
