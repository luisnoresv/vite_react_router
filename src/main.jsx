import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root, {
	loader as rootLoader,
	action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
	loader as contactLoader,
	action as contactAction,
} from './routes/contact';
import EditContact, {
	loader as editLoader,
	action as editAction,
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: editLoader,
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyAction,
						errorElement: <div>Ooops! There was an error</div>,
					},
				],
			},
		],
	},
	// {
	// 	path: 'contacts/:contactId',
	// 	element: <Contact />,
	// },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
