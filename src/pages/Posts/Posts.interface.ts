import type {
	TableData,
	TableColumn,
	SortParams,
} from '../../components/Table';
import type { WithStyles } from '@material-ui/core';
import type { postsStyles } from '../../styles/Posts.styles';

export interface PostsProps extends WithStyles<typeof postsStyles> {}

export interface PostsState {
	apiData: TableData[];
	viewData: TableData;
	isModalOpen: boolean;
	table: {
		sort: SortParams;
		searchValue: string;
		data: TableData[];
		columns: TableColumn[];
		page: number;
		count: number;
		rowsPerPage: number;
	};
}
