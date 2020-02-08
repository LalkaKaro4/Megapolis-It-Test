import React, { useContext } from 'react';
import { createPortal } from 'react-dom';

import { INoteInput } from 'app/entities';
import { Button, ButtonStyle, Form } from 'app/components';
import { NotesContext } from 'app/contexts';

import { ReactComponent as Times } from "assets/svg/times.svg";


interface INoteModal {
	onClose?: () => void;
}


interface IAddNoteModal extends INoteModal {
	open?: boolean;
}

const NoteModal: React.FC<INoteModal> = ({ onClose }) => {

	const { CreateNote } = useContext(NotesContext);

	const onSumbit = (note: INoteInput) => {
		CreateNote(note)
			.then(() => onClose?.());
	};

	return (
		<div className="popup">
			<div className="popup-container">
				<Button
					Icon={Times}
					color={ButtonStyle.RED}
					className="close"
					onClick={onClose}
				/>
				<div className="popup-main">
					<Form
						note={{
							id: "0",
							title: ""
						}}
						textSumbit="Создать"
						onSumbit={onSumbit}
					/>
				</div>
			</div>
		</div>
	);
};

const AddNoteModal: React.FC<IAddNoteModal> = ({ open, ...rest }) => (
	open ? createPortal(<NoteModal {...rest} />, document.body) : null
);

export default AddNoteModal;