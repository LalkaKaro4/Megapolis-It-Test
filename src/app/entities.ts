export interface IResponseBase {
	success: boolean;
	error: string;
}

export interface INoteBase {
	title: string;
}

export interface INoteID {
	id: number;
}


// note
export interface INote extends INoteBase, INoteID { }

// note create

export interface INoteCreated extends INoteID, IResponseBase { }


// list

export interface IList extends IResponseBase {
	data: INote[];
	length: number;
	success: boolean;
	error: string;
}
