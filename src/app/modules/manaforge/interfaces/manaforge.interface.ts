import { CrudDocument } from 'wacom';

export interface ManaforgePlayer {
	user: string;
	name: string;
	hero: string;
	health: number;
	mana: number;
}

export interface Manaforge extends CrudDocument {
	author: string;
	world: string;
	mana: 'Author' | 'Average' | 'Round';
	story: string;
	name: string;
	code: string;
	status: 'New' | 'Started' | 'Completed';
	moderators: string[];
	players: ManaforgePlayer[];
}
