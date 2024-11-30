import { CrudDocument } from 'wacom';

export interface Manaforgedungeon extends CrudDocument {
	name: string;
	description: string;
	world: string;
}
