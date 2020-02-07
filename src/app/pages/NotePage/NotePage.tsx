import React, { useContext, useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { INoteID, INote, INoteInput } from 'app/entities';
import { NotesContext } from 'app/contexts';
import { PageWrapper, Button, ButtonStyle, Form } from 'app/components';

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

	const onSumbit = ({ title }: INoteInput) => {
		if (title === note.title) {
			return history.push("/");
		}

		ChangeNote({ ...note, title })
			.then(() => history.push("/"));
	};

	return (
		<Form
			note={note}
			textSumbit={inputs.title !== note.title
				? "Сохранить"
				: "Вернуться к списку"
			}
			onInputChange={inputs => setInputs(inputs)}
			onSumbit={onSumbit}
		/>
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