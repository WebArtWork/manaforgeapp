import { CrudDocument } from 'wacom';

export interface Manaforgehero extends CrudDocument {
	name: string;
	description: string;
	world: string;
	thumb: string;
}
