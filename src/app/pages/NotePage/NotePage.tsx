import React, { useContext, useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { INoteID, INote, INoteInput } from 'app/entities';
import { NotesContext } from 'app/contexts';
import { PageWrapper, Button, ButtonStyle } from 'app/components';

import { ReactComponent as Trash } from "assets/svg/trash.svg";
import { history } from 'app/constants';

export const ValidationTitle = (title: string) => {
	if (!title)
		return "Заголовок не может быть пустым";

	return "";
};

const Note: React.FC<INote> = (note) => {

	const { ChangeNote } = useContext(NotesContext);
	const [inputs, setInputs] = useState<INoteInput>(note);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		const { name, value } = event.target;

		setInputs(inputs => ({
			...inputs,
			[name]: value,
			[name + "Error"]: ""
		}));
	};

	const handleSumbit = () => {
		const { title } = inputs;

		if (title === note.title) {
			return history.push("/");
		}

		const titleError = ValidationTitle(title);

		setInputs(inputs => ({ ...inputs, titleError }));

		if (titleError)
			return;

		ChangeNote({ ...note, title })
			.then(() => history.push("/"));
	};

	return (
		<div className="form">
			<div className="form-group">
				<label className="form-label" htmlFor="title">Краткое описание</label>
				<input
					className="form-input"
					name="title"
					type="text"
					value={inputs.title}
					onChange={handleInputChange}
				/>
				<span className="input-error" >{inputs.titleError}</span>
			</div>

			<div className="form-group">
				<Button
					text={inputs.title !== note.title
						? "Сохранить"
						: "Вернуться к списку"
					}
					color={ButtonStyle.BLUE}
					onClick={handleSumbit}
				/>
			</div>
		</div>
	);
};


const NotePage: React.FC<RouteComponentProps<INoteID>> = ({ history, match }) => {

	const { data, RemoveNote } = useContext(NotesContext);

	const idNote = match.params.id;
	const findNote = data.data.find(val => String(val.id) === idNote);

	if (!findNote)
		return <Redirect to="/" />;

	return (
		<PageWrapper
			header={`Задача №${idNote}`}
			headerButton={(
				<Button
					color={ButtonStyle.RED}
					Icon={Trash}
					text="Удалить"
					onClick={() => {
						RemoveNote(findNote)
							.then(() => history.push("/"));
					}}
				/>
			)}
		>
			<Note {...findNote} />
		</PageWrapper>
	);
};

export default NotePage;