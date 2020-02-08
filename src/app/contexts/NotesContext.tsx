import React, { useEffect, useState } from 'react';
import axios from "axios";

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

		return axios.post(process.env.REACT_APP_API_URL, note)
			.then<INoteCreated>(res => res.data)
			.then(res => {

				if (!res.error && res.success) {
					data.data.push({
						...note,
						id: res.id,
					});
					data.length = data.data.length;
				}

				setData({
					...data,
					...res
				});
			})
			.catch(console.log);
	};

	const ChangeNote = ({ id, ...rest }: INote) => {

		return axios.post(`${process.env.REACT_APP_API_URL}/${id}`, rest)
			.then<IResponseBase>(res => res.data)
			.then(res => {

				if (!res.error && res.success) {
					data.data = data.data.map(val => {
						if (val.id === id) {
							val = { ...val, ...rest };
						}
						return val;
					});
				}

				setData({
					...data,
					...res
				});
			})
			.catch(console.log);
	};

	const RemoveNote = (note: INote) => {

		return axios.delete(`${process.env.REACT_APP_API_URL}/${note.id}`)
			.then<IResponseBase>(res => res.data)
			.then(res => {

				if (!res.error && res.success) {
					data.data = data.data.filter(val => val.id !== note.id);
					data.length = data.data.length;
				}

				setData({
					...data,
					...res
				});
			})
			.catch(console.log);
	};


	useEffect(() => {

		axios.get(process.env.REACT_APP_API_URL)
			.then<IList>(res => res.data)
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