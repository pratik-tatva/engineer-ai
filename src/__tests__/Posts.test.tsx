import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import axios from 'axios';

// Pages
import Posts from '../pages/Posts/Posts.web';

// Mocks
import { mockData } from '../__mocks__/mockData';

jest.mock('axios');

beforeEach(() => {
	const mockedAxios = axios as jest.Mocked<typeof axios>;
	mockedAxios.get.mockResolvedValue(mockData);
});

afterEach(() => {
	jest.clearAllMocks();
	jest.clearAllTimers();
});

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

describe('Posts', () => {
	test('Is interval function works?', async () => {
		render(<Posts />);

		await act(async () => {
			jest.runAllTicks();
		});

		expect(setInterval).toHaveBeenCalledTimes(1);
	});

	test('Is pagination works?', async () => {
		const { getByRole, findByLabelText } = render(<Posts />);
		const prevButtonEl = getByRole('button', {
			name: 'Go to previous page',
		});
		const page2ButtonEl = await findByLabelText('Go to page 2');
		const nextButtonEl = getByRole('button', {
			name: 'Go to next page',
		});

		await act(async () => {
			fireEvent.click(page2ButtonEl);
		});

		expect(prevButtonEl).not.toHaveAttribute('disabled');
		expect(nextButtonEl).toHaveAttribute('disabled');
	});

	test('Is searching works?', async () => {
		const { findByPlaceholderText } = render(<Posts />);
		const searchValue = 'miika_raitakari';
		const searchInputEl = await findByPlaceholderText(
			'Search by title, URL, author'
		);

		await act(async () => {
			fireEvent.change(searchInputEl, { target: { value: searchValue } });
		});

		// Will check is searched data rows is exists...
	});

	test('Is popup modal works?', async () => {
		const { findByTestId, findByRole } = render(<Posts />);

		const viewActionButtonEl = await findByTestId('view-button-0');

		await act(async () => {
			fireEvent.click(viewActionButtonEl);
		});

		const popupModalEl = await findByRole('presentation');
		expect(popupModalEl).toBeInTheDocument();
		const modalCloseButtonEl = await findByTestId('modal-close-button');

		await act(async () => {
			fireEvent.click(modalCloseButtonEl);
		});
	});

	test('Is sorting works?', async () => {
		const { findAllByRole } = render(<Posts />);
		const tableHeaderColumnEl = await findAllByRole('columnheader');
		const titleColumnEl = tableHeaderColumnEl[0];

		await act(async () => {
			fireEvent.click(titleColumnEl);
		});
	});
});
