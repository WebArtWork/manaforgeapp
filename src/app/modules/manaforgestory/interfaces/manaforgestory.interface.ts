import { CrudDocument } from 'wacom';

export interface Manaforgestory extends CrudDocument {
	name: string;
	description: string;
	world: string;
	story: string;
}
