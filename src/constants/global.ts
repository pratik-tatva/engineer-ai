export const PAGE_LIMIT = 10;
export const INIT_PAGE = 0;
export const INIT_COUNT = 0;
export const INIT_SEARCH_VALUE = '';
export const SORT_ORDER = {
	ASC: 'ASC',
	DESC: 'DESC',
} as const;

export const REFETCH_TIME = 1000 * 1; // 10s;

export const COLUMNS = [
	{ field: 'title', title: 'Title', isSortable: true },
	{ field: 'author', title: 'Author', isSortable: true },
	{ field: 'url', title: 'URL', isSortable: true },
	{ field: 'createdAt', title: 'Create At', isSortable: false },
];
