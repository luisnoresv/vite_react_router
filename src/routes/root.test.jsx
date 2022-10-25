import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import Root from './root';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('Root', () => {
	const mockUsersList = { contacts: [], q: '' };
	const routes = [
		{
			path: '/',
			element: <Root />,
			loader: () => mockUsersList,
		},
	];

	const router = createMemoryRouter(routes);

	it('Renderers without error', () => {
		// ARRANGE
		const { container } = render(<RouterProvider router={router} />);
		// ASSERT
		expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
			'React Router Contacts'
		);
		expect(screen.getByRole('search')).toBeInTheDocument();
		expect(container.querySelector('div#search-spinner')).toBeInTheDocument();
		expect(screen.getByLabelText('Search contacts')).toBeInTheDocument();
		expect(screen.getByText('New')).toBeInTheDocument();
		expect(screen.getByRole('navigation')).toHaveTextContent('No contacts');
	});
});

describe('Root with users', () => {
	const mockUsersList = {
		contacts: [
			{
				id: 1,
				avatar: 'https://someUserImage.jpg',
				first: 'John',
				last: 'Doe',
				notes: 'Some notes',
				twitter: '@johnDoe',
			},
			{
				id: 2,
				avatar: 'https://someUserImage2.jpg',
				first: 'Jane',
				last: 'Doe',
				notes: 'Some other notes',
				twitter: '@janeDoe',
			},
		],
		q: '',
	};

	const routes = [
		{
			path: '/',
			element: <Root />,
			loader: () => mockUsersList,
		},
	];

	const router = createMemoryRouter(routes);
	it('Renderers a list of users correctly', async () => {
		render(<RouterProvider router={router} />);

		expect(
			screen.getByRole('navigation').querySelectorAll('a').item(0)
		).toHaveTextContent('John Doe');
		expect(
			screen
				.getByRole('navigation')
				.querySelectorAll('a')
				.item(0)
				.getAttribute('href')
		).toEqual('/contacts/1');
		expect(
			screen.getByRole('navigation').querySelectorAll('a').item(1)
		).toHaveTextContent('Jane Doe');
		expect(
			screen
				.getByRole('navigation')
				.querySelectorAll('a')
				.item(1)
				.getAttribute('href')
		).toEqual('/contacts/2');
	});
});
