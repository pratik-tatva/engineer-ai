import { makeStyles, createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

export const useModalStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		modalContainer: {
			background: 'white',
			borderRadius: '8px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'end',
			position: 'relative',
		},
		modalCloseButton: {
			position: 'absolute',
			top: 0,
			right: 0,
			marginLeft: 'auto',
			'& > span': {
				height: '36px',
				width: '36px',
			},
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);
