import { useEffect } from 'react';
import {
	NavLink,
	Outlet,
	useLoaderData,
	Form,
	redirect,
	useNavigation,
	useSubmit,
} from 'react-router-dom';

import { getContacts, createContact } from '../contacts';

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const contacts = await getContacts(q);
	return { contacts, q };
}

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
	// const [value, setValue] = useState('');
	// const inputRef = useRef(null);
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q]);

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q');

	// const handlerClick = () => {
	// console.info(value);
	// 	console.info(inputRef.current.value);
	// };

	// const disable = value.length < 6;

	return (
		<>
			<div id='sidebar'>
				{/* <h1>React Router Contacts</h1>
				<input
					type='text'
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
				/>
				<button disabled={disable} onClick={handlerClick}>
					Click Me
				</button> */}
				{/* <input type='text' ref={inputRef} />
				<button onClick={handlerClick}>Click Me UseRef</button> */}
				<div>
					<Form id='search-form' role='search'>
						<input
							id='q'
							className={searching ? 'loading' : ''}
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
							defaultValue={q}
							onChange={(e) => {
								const isFirstSearch = q == null;
								submit(e.currentTarget.form, {
									replace: !isFirstSearch,
								});
							}}
						/>
						<div id='search-spinner' aria-hidden hidden={!searching} />
						<div className='sr-only' aria-live='polite'></div>
					</Form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>
					{/* <ul>
						<li>
							<Link href={`contacts/1`}>Your Name</Link>
						</li>
						<li>
							<Link href={`contacts/2`}>Your Friend</Link>
						</li>
					</ul> */}
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? 'active' : isPending ? 'pending' : ''
										}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id='detail'
				className={navigation.state === 'loading' ? 'loading' : ''}>
				<Outlet />
			</div>
		</>
	);
}
