import React, { useEffect, useState } from 'react';

import { IList } from 'app/entities';
import { NotesWrapper } from 'app/components';

interface INotesContext {
	isLoading: boolean;
	data: IList;
}

const initialState = {
	isLoading: true,
	data: {
		notes: [],
		length: 0,
		success: false,
		error: "",
	},
} as INotesContext;

export const NotesContext = React.createContext<INotesContext>(initialState);

export const NotesProvider: React.FC = ({ children }) => {

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(initialState.data);

	useEffect(() => {

		fetch(process.env.REACT_APP_API_URL)
			.then<IList>(res => res.json())
			.then(json => setData(json))
			.then(() => setIsLoading(false))
			.catch(() => setIsLoading(false));

	}, []);

	return (
		<NotesContext.Provider value={{
			isLoading,
			data
		}}>
			<NotesWrapper>
				{children}
			</NotesWrapper>
		</NotesContext.Provider>
	);
};