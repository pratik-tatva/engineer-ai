import React from 'react';
import type { ReactNode } from 'react';

// Components
import Table from '../../components/Table';
import Modal from '../../components/Modal';

// Styles
import { postsStyles } from '../../styles/Posts.styles';
import { withStyles } from '@material-ui/core';

// Controllers
import PostsController from './PostsController';

export class Posts extends PostsController {
	render(): ReactNode {
		const { classes } = this.props;

		return (
			<div className={classes.posts}>
				<h1 className={classes.title}>Engineering AI Assignment</h1>
				<Modal
					isOpen={this.state.isModalOpen}
					onClose={() => {
						this.handleModalClose();
					}}
				>
					<div className={classes.tableModal}>
						<ul>
							{Object.entries(this.state?.viewData).map(([key, value]) => (
								<li key={key} style={{ marginBottom: '8px' }}>
									<h5>{key.toUpperCase()}</h5>
									<span>{value as string}</span>
								</li>
							))}
						</ul>
					</div>
				</Modal>

				<Table
					columns={this.state.table.columns}
					data={this.state.table.data}
					page={this.state.table.page + 1}
					count={this.state.table.count}
					rowsPerPage={this.state.table.rowsPerPage}
					onPageChange={(e, pageNumber) => {
						const event = e as React.ChangeEvent<HTMLButtonElement>;
						this.handlePageChange(event, pageNumber - 1);
					}}
					sort={this.state.table.sort}
					searchValue={this.state.table.searchValue}
					onSort={({ column, order }) => {
						this.handleSort({ column, order });
					}}
					onSearch={(searchValue) => {
						this.handleSearch(searchValue);
					}}
					onView={(id) => {
						this.handleView(id);
					}}
				/>
			</div>
		);
	}
}

export default withStyles(postsStyles, { withTheme: true })(Posts);
