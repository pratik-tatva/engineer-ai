import React, { Component } from 'react';
import type { ReactNode } from 'react';

// Styles
import { appStyles } from './styles/App.styles';
import { withStyles } from '@material-ui/core/styles';
import type { WithStyles } from '@material-ui/core/styles';
import './App.css';

// Pages
import Posts from './pages/Posts';

// Define Props interface
interface AppProps extends WithStyles<typeof appStyles> {}

class App extends Component<AppProps> {
	render(): ReactNode {
		const { classes } = this.props;

		return (
			<div className={`${classes.root} ${classes.app}`}>
				<Posts />
			</div>
		);
	}
}

export default withStyles(appStyles, { withTheme: true })(App);
