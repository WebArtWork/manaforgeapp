import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgedungeonService } from '../../services/manaforgedungeon.service';
import { Manaforgedungeon } from '../../interfaces/manaforgedungeon.interface';

@Component({
	selector: 'manaforgedungeon-selector',
	templateUrl: './manaforgedungeon-selector.component.html',
	styleUrls: ['./manaforgedungeon-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgedungeon[] {
		return this._manaforgedungeonService.manaforgedungeons;
	}

	constructor(private _manaforgedungeonService: ManaforgedungeonService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
