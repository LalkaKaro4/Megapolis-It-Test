import React, { useContext, useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { INoteID, INote } from 'app/entities';
import { NotesContext } from 'app/contexts';
import { PageWrapper, Button } from 'app/components';

import { ReactComponent as Trash } from "assets/svg/trash.svg";

const Note: React.FC<INote> = ({ title }) => {

	const [isChanged, setisChanged] = useState(false);


	return (
		<div className="form">

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