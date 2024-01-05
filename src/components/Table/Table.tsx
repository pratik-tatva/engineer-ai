import React from 'react';

// Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';

// Icons
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Constants
import { SORT_ORDER } from './Table.constants';

// Hooks
import { useTableStyles } from './Table.styles';

// Interfaces
import type { TableProps } from './Table.interface';

export default function CustomTable({
	data,
	page,
	sort,
	columns,
	searchValue,
	rowsPerPage,
	count,
	onView,
	onEdit,
	onDelete,
	onSort,
	onSearch,
	onPageChange,
}: TableProps): JSX.Element {
	const classes = useTableStyles();

	return (
		<TableContainer className={classes.tableContainer} component={Paper}>
			<TextField
				className={classes.searchFilter}
				InputProps={{
					classes: {
						input: classes.searchFilterInput,
					},
				}}
				variant="outlined"
				size="small"
				value={searchValue}
				placeholder="Search by title, URL, author"
				onChange={(e) => {
					onSearch(e.target.value);
				}}
			/>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{columns?.map((column, columnIndex) => (
							<TableCell
								scope="head"
								key={`${column.field}${columnIndex}`}
								onClick={() => {
									const selectedColumnSortOrder =
										sort.column === column.field &&
										sort.order === SORT_ORDER.ASC
											? SORT_ORDER.ASC
											: sort.column === column.field &&
												  sort.order === SORT_ORDER.ASC
												? SORT_ORDER.DESC
												: SORT_ORDER.DESC;
									const newSortOrder =
										selectedColumnSortOrder === SORT_ORDER.ASC
											? SORT_ORDER.DESC
											: SORT_ORDER.ASC;

									column.isSortable === true &&
										onSort({
											column: column.field,
											order: newSortOrder,
										});
								}}
							>
								<div className={classes.tableHeaderColumn}>
									{column.title}
									{column.isSortable === true ? (
										<>
											{sort.column === column.field && sort.order === 'ASC' ? (
												<ArrowUpward
													style={{
														width: '16px',
														height: '16px',
													}}
												/>
											) : sort.column === column.field &&
											  sort.order === 'DESC' ? (
												<ArrowDownward
													style={{
														width: '16px',
														height: '16px',
													}}
												/>
											) : (
												<ArrowDownward
													style={{
														width: '16px',
														height: '16px',
													}}
												/>
											)}
										</>
									) : (
										<></>
									)}
								</div>
							</TableCell>
						))}
						{(onView !== undefined ||
							onEdit !== undefined ||
							onDelete !== undefined) && (
							<TableCell scope="head" key={`actions${columns.length}`}>
								Actions
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((row, rowIndex) => {
						return (
							<TableRow key={`${String(row.name)}${rowIndex}`}>
								{columns.map((column, columnIndex) => {
									return (
										<TableCell
											scope="row"
											key={`${String(row.name)}${rowIndex}${
												column.field
											}${columnIndex}`}
										>
											{row[column.field] as string}
										</TableCell>
									);
								})}
								{(onView !== undefined ||
									onEdit !== undefined ||
									onDelete !== undefined) && (
									<TableCell
										scope="row"
										key={`${String(row.name)}${rowIndex}${columns.length}`}
									>
										<Button
											data-testid={`view-button-${rowIndex}`}
											onClick={() => onView?.(row.id as string)}
										>
											<VisibilityIcon />
										</Button>
									</TableCell>
								)}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<div
				style={{
					paddingTop: '16px',
					display: 'flex',
					justifyContent: 'end',
				}}
			>
				<Pagination
					className={classes.pagination}
					count={Math.floor(count / rowsPerPage)}
					variant="outlined"
					page={page}
					onChange={onPageChange}
				/>
			</div>
		</TableContainer>
	);
}
