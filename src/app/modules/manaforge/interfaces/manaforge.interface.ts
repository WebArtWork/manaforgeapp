import { CrudDocument } from 'wacom';

export interface Manaforge extends CrudDocument {
	name: string;
	description: string;
}
