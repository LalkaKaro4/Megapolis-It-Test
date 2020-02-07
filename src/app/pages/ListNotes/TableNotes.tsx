import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { NotesContext } from 'app/contexts';
import { Button, ButtonStyle } from 'app/components';

import { ReactComponent as Pencil } from "assets/svg/pencil.svg";
import { ReactComponent as Trash } from "assets/svg/trash.svg";


export const Table: React.FC = () => {

	const { data, RemoveNote } = useContext(NotesContext);

	const table = data.data.map(note => (
		<div key={note.id} className="table-row">
			<div className="table-cell">{note.id}</div>
			<div className="table-cell">{note.title}</div>
			<div className="table-cell edit">
				<ul className="list">
					<li className="list-item">
						<Link to={`/${note.id}`}>
							<Button noPreventDefault Icon={Pencil} />
						</Link>
					</li>
					<li className="list-item">
						<Button
							Icon={Trash}
							color={ButtonStyle.RED}
							onClick={() => RemoveNote(note)}
						/>
					</li>
				</ul>
			</div>
		</div>
	));

	return (
		<div className="table">
			{table}
		</div>
	);
};