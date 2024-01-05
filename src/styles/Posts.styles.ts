// Styles
import { createStyles } from '@material-ui/core/styles';

export const postsStyles = createStyles({
	tableModal: {
		background: 'white',
		width: 'auto',
		height: 'auto',
		borderRadius: '8px',
		padding: '32px',
		'& ul > li': {
			fontFamily: 'Roboto',
			fontSize: '18px',
			whiteSpace: 'pre-wrap',
		},
	},
	title: {
		fontSize: '24px',
		marginBottom: '8px',
		fontFamily: 'Roboto',
	},
	posts: {},
});
