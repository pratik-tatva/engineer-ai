import { Component } from 'react';
import type { ChangeEvent } from 'react';

// Components
import type { SortParams, TableData } from '../../components/Table';

// Constants
import {
	COLUMNS,
	PAGE_LIMIT,
	INIT_PAGE,
	INIT_COUNT,
	SORT_ORDER,
	INIT_SEARCH_VALUE,
	REFETCH_TIME,
} from '../../constants/global';

// Services
import { getLatestPosts } from '../../services/post';

// Interfaces
import type { PostsProps, PostsState } from './Posts.interface';

export default class PostsController extends Component<PostsProps, PostsState> {
	constructor(props: PostsProps) {
		super(props);
		this.state = {
			apiData: [],
			viewData: {},
			isModalOpen: false,
			table: {
				data: [],
				searchValue: INIT_SEARCH_VALUE,
				page: INIT_PAGE,
				count: INIT_COUNT,
				columns: COLUMNS,
				rowsPerPage: PAGE_LIMIT,
				sort: {
					column: COLUMNS[0].field,
					order: SORT_ORDER.ASC,
				},
			},
		};
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleView = this.handleView.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleApiData = this.handleApiData.bind(this);
	}

	async componentDidMount(): Promise<void> {
		let page = INIT_PAGE;
		await this.handleApiData(page);

		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		setInterval(async (): Promise<void> => {
			await this.handleApiData(page);
			page = page + 1;
		}, REFETCH_TIME);
	}

	componentDidUpdate(
		prevProps: Readonly<PostsProps>,
		prevState: Readonly<PostsState>
	): void {
		const prevTableState = prevState.table;
		const currentTableState = this.state.table;

		// Searching + Sorting + Pagination
		if (
			prevTableState.searchValue !== currentTableState.searchValue ||
			prevTableState.sort.column !== currentTableState.sort.column ||
			prevTableState.sort.order !== currentTableState.sort.order ||
			prevTableState.page !== currentTableState.page ||
			prevTableState.rowsPerPage !== currentTableState.rowsPerPage
		) {
			const isSearching =
				prevTableState.searchValue !== currentTableState.searchValue;

			const tableData: TableData[] = [];
			const page = isSearching ? INIT_PAGE : currentTableState.page;
			const startIndex = page * currentTableState.rowsPerPage;
			const endIndex = startIndex + currentTableState.rowsPerPage;

			const searchedData =
				currentTableState.searchValue === ''
					? this.state.apiData
					: this.state.apiData.filter((item: Record<string, unknown>) => {
							if (
								item?.title
									?.toString()
									?.includes(currentTableState.searchValue) === true ||
								item?.author
									?.toString()
									?.includes(currentTableState.searchValue) === true ||
								item?.url
									?.toString()
									?.includes(currentTableState.searchValue) === true ||
								item?.createdAt
									?.toString()
									?.includes(currentTableState.searchValue) === true
							) {
								return true;
							}
							return false;
						});

			const sortedData = searchedData.sort((a, b) => {
				const aLabel = String(a[currentTableState.sort.column]).toLowerCase();
				const bLabel = String(b[currentTableState.sort.column]).toLowerCase();

				if (currentTableState.sort.order === SORT_ORDER.ASC) {
					return aLabel?.localeCompare(bLabel);
				} else if (currentTableState.sort.order === SORT_ORDER.DESC) {
					return bLabel?.localeCompare(aLabel);
				} else {
					return 0;
				}
			});

			for (let i = startIndex; i < endIndex; i++) {
				if (sortedData[i] !== undefined) {
					tableData.push(sortedData[i]);
				}
			}

			this.setState((prevState) => ({
				...prevState,
				table: {
					...currentTableState,
					page,
					data: tableData,
					count: searchedData.length,
					rowsPerPage: currentTableState.rowsPerPage,
				},
			}));
		}
	}

	async fetchPosts(page?: number): Promise<
		Array<{
			id: string;
			title: string;
			author: string;
			url: string;
			createdAt: string;
		}>
	> {
		const responseData = await getLatestPosts(page);
		const result = responseData?.hits?.map((item: Record<string, unknown>) => ({
			id: item.objectID,
			title: item.title,
			author: item.author,
			url: item.url,
			createdAt: item.created_at,
		}));
		if (result !== undefined && result.length > 0) {
			return result;
		}
		return [];
	}

	// Handle-Functions
	async handleApiData(page: number): Promise<void> {
		const tableData = [] as TableData[];
		const startIndex = page * PAGE_LIMIT;
		const endIndex = startIndex + PAGE_LIMIT;
		const apiData = await this.fetchPosts(page);
		const newRecords = apiData.filter((newItem) => {
			const duplicateRecord = this.state.apiData.filter(
				(oldItem) => oldItem.id === newItem.id
			);
			return duplicateRecord.length === 0;
		});
		const newApiData = [...this.state.apiData, ...newRecords];

		for (let i = startIndex; i < endIndex; i++) {
			if (newApiData?.[i] !== undefined) {
				tableData.push(newApiData[i] as TableData);
			}
		}

		this.setState((prevState) => ({
			...prevState,
			apiData: newApiData,
			table: {
				...this.state.table,
				count: newApiData.length,
				...(this.state.table.searchValue === '' && {
					count: newApiData.length,
				}),
				...(page === INIT_PAGE && { data: tableData }),
			},
		}));
	}

	handlePageChange(
		event: ChangeEvent<HTMLButtonElement>,
		newPage: number
	): void {
		this.setState((prevState) => {
			return {
				...prevState,
				table: { ...prevState.table, page: newPage },
			};
		});
	}

	handleSort({ column, order }: SortParams): void {
		console.log('column', column);
		console.log('order', order);
		this.setState((prevState) => ({
			...prevState,
			table: {
				...prevState.table,
				sort: {
					column,
					order,
				},
			},
		}));
	}

	handleView(dataId: string): void {
		const viewData = this.state.apiData.find(
			(item: Record<string, unknown>) => String(item.id) === String(dataId)
		);

		if (viewData !== undefined) {
			this.setState({
				viewData,
				isModalOpen: true,
			});
		}
	}

	handleModalClose(): void {
		this.setState({
			isModalOpen: false,
			viewData: {},
		});
	}

	handleSearch(searchValue: string): void {
		this.setState((prevState) => ({
			...prevState,
			table: {
				...prevState.table,
				searchValue,
			},
		}));
	}
}
