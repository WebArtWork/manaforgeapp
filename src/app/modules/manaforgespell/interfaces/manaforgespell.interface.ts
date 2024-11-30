import { CrudDocument } from 'wacom';

export interface Manaforgespell extends CrudDocument {
	name: string;
	description: string;
	world: string;
	school: string;
}
