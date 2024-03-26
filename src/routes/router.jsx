import { createBrowserRouter } from 'react-router-dom';
import { Index } from '.';
import ErrorPage from '../error-page';
import Contact, {
	action as contactAction,
	loader as contactLoader,
} from './contact';
import { DogsDetails } from './dogs/details';
import { DogsList } from './dogs/list';
import EditContact, {
	action as editAction,
	loader as editLoader,
} from './edit';
import Root, { action as rootAction, loader as rootLoader } from './root';

import { action as destroyAction } from './destroy';

export const router = createBrowserRouter([
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
	{
		path: 'dogs/',
		element: <DogsList />,
	},
	{
		path: 'dogs/details',
		element: <DogsDetails />,
	},
]);
