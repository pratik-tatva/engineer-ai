import type { SORT_ORDER } from './Table.constants';

export type TableData = Record<string, unknown>;
export interface TableColumn {
	field: string;
	title: string;
	isSortable?: boolean;
}

export interface SortParams {
	column: string;
	order: keyof typeof SORT_ORDER;
}

export interface TablePaginationActionsProps {
	page: number;
	rowsPerPage: number;
	count: number;
	onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export interface TableProps extends TablePaginationActionsProps {
	data: TableData[];
	columns: TableColumn[];
	sort: SortParams;
	searchValue: string;
	onSearch: (inputValue: string) => void;
	onView?: (dataId: string) => void;
	onEdit?: (dataId: string) => void;
	onDelete?: (dataId: string) => void;
	onSort: ({ column, order }: SortParams) => void;
}
