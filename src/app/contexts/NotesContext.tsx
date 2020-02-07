import React from 'react';

import { useFetch } from 'app/helpers';
import { IList } from 'app/entities';
import { NotesWrapper } from 'app/components';

interface INotesContext {
	isLoading: boolean;
	notes: IList | undefined;
}

const initialState = {
	isLoading: true,
	notes: undefined,
} as INotesContext;

export const NotesContext = React.createContext<INotesContext>(initialState);

export const NotesProvider: React.FC = ({ children }) => {

	const { isLoading, data } = useFetch<IList>(process.env.REACT_APP_API_URL, {
		isLoading: initialState.isLoading,
		data: initialState.notes
	});

	return (
		<NotesContext.Provider value={{
			isLoading,
			notes: data
		}}>
			<NotesWrapper>
				{children}
			</NotesWrapper>
		</NotesContext.Provider>
	);
};