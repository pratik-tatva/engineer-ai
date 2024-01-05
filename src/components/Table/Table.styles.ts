// Styles
import { makeStyles, createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

export const useTablePaginationStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
	})
);

export const useTableStyles = makeStyles({
	tableContainer: {
		padding: '24px',
		border: '1px solid lightgray',
		borderRadius: '8px',
		width: 'auto',
		overflow: 'hidden',
	},
	searchFilterInput: {
		borderBottom: 'none', // or '0 none'
	},
	tableHeaderColumn: {
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
	},
	searchFilter: {
		width: '250px',
		border: '1px solid lightgray',
		borderRadius: '4px',
		padding: '0px',
		fontSize: '16px',
		// paddingLeft: '16px',
	},
	tablePagination: {
		width: '100%',
		display: 'flex',
		justifyContent: 'end',
		padding: '24px',
	},
	pagination: {
		marginRight: '48px',
	},
	table: {
		width: '100%',
		marginTop: '24px',
		display: 'block',
	},
});
