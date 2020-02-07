import React, { useEffect, useState } from 'react';

import { IList, INoteBase, INote, IResponseBase, INoteCreated } from 'app/entities';
import { NotesWrapper } from 'app/components';

interface INotesContext {
	isLoading: boolean;
	data: IList;
	CreateNote: (note: INoteBase) => Promise<void>;
	ChangeNote: (note: INote) => Promise<void>;
	RemoveNote: (note: INote) => Promise<void>;
}

const initialState = {
	isLoading: true,
	data: {
		data: [],
		length: 0,
		success: false,
		error: "",
	},
	CreateNote: () => new Promise(() => { }),
	ChangeNote: () => new Promise(() => { }),
	RemoveNote: () => new Promise(() => { })
} as INotesContext;

export const NotesContext = React.createContext<INotesContext>(initialState);

export const NotesProvider: React.FC = ({ children }) => {

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(initialState.data);

	const CreateNote = (note: INoteBase) => {

		return fetch(process.env.REACT_APP_API_URL, {
			method: "POST",
			body: JSON.stringify(note)
		})
			.then<INoteCreated>(res => res.json())
			.then(res => {

				if (!res.error && res.success) {
					data.data.push({
						id: res.id,
						...note
					});
				}

				setData({
					...data,
					...res
				});
			})
			.catch(console.log);
	};

	const ChangeNote = (note: INote) => {

		return fetch(`${process.env.REACT_APP_API_URL}/${note.id}`, { method: "POST" })
			.then<IResponseBase>(res => res.json())
			.then(res => {

				setData({
					...data,
					...res
				});

			})
			.catch(console.log);
	};

	const RemoveNote = (note: INote) => {

		return fetch(`${process.env.REACT_APP_API_URL}/${note.id}`, { method: "DELETE" })
			.then<IResponseBase>(res => res.json())
			.then(res => {

				if (!res.error && res.success)
					data.data = data.data.filter(val => val.id !== note.id);

				setData({
					...data,
					...res
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