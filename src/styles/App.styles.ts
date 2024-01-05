// Styles
import { createStyles } from '@material-ui/core/styles';

export const appStyles = createStyles({
	root: {
		'& label.Mui-focused': {
			border: 'none',
		},
		'& .MuiInput-underline:after': {
			border: 'none',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				border: 'none',
			},
		},
	},
	app: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});
