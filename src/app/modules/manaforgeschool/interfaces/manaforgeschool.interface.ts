import { CrudDocument } from 'wacom';

export interface Manaforgeschool extends CrudDocument {
	name: string;
	description: string;
	world: string;
}
