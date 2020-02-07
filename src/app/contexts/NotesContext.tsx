import React, { useEffect, useState } from 'react';

import { IList, INoteBase, INote, INoteID, IResponseBase } from 'app/entities';
import { NotesWrapper } from 'app/components';

interface INotesContext {
	isLoading: boolean;
	data: IList;
	CreateNote: (note: INoteBase) => void;
	ChangeNote: (note: INote) => void;
	RemoveNote: (note: INote) => void;
}

const initialState = {
	isLoading: true,
	data: {
		data: [],
		length: 0,
		success: false,
		error: "",
	},
	CreateNote: () => { },
	ChangeNote: () => { },
	RemoveNote: () => { }
} as INotesContext;

export const NotesContext = React.createContext<INotesContext>(initialState);

export const NotesProvider: React.FC = ({ children }) => {

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(initialState.data);

	const CreateNote = (note: INoteBase) => {

	};

	const ChangeNote = (note: INote) => {

	};

	const RemoveNote = (note: INote) => {

		fetch(`${process.env.REACT_APP_API_URL}/${note.id}`, {
			method: "DELETE"
		})
			.then<IResponseBase>(res => res.json())
			.then(res => {
				if (res.error || !res.success)
					throw new Error(res.error || "unknown error");

				setData({
					...data,
					data: data.data.filter(val => val.id !== note.id)
				});
			})
			.catch(console.log);
	};


	useEffect(() => {

		fetch(process.env.REACT_APP_API_URL)
			.then<IList>(res => res.json())
			.then(json => setData(json))
			.then(() => setIsLoading(false))
			.catch(e => {
				console.log(e);
				setIsLoading(false);
			});

	}, []);

	return (
		<NotesContext.Provider value={{
			isLoading,
			data,
			CreateNote,
			ChangeNote,
			RemoveNote
		}}>
			<NotesWrapper>
				{children}
			</NotesWrapper>
		</NotesContext.Provider>
	);
};