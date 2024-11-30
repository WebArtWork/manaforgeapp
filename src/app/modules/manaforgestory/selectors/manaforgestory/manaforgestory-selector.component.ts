import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgestoryService } from '../../services/manaforgestory.service';
import { Manaforgestory } from '../../interfaces/manaforgestory.interface';

@Component({
	selector: 'manaforgestory-selector',
	templateUrl: './manaforgestory-selector.component.html',
	styleUrls: ['./manaforgestory-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgestory[] {
		return this._manaforgestoryService.manaforgestorys;
	}

	constructor(private _manaforgestoryService: ManaforgestoryService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
