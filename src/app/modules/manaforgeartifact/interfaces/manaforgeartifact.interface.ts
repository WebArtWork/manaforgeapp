import { CrudDocument } from 'wacom';

export interface Manaforgeartifact extends CrudDocument {
	name: string;
	description: string;
	world: string;
	dungeon: string;
}
