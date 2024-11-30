import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgeService } from '../../services/manaforge.service';
import { Manaforge } from '../../interfaces/manaforge.interface';

@Component({
	selector: 'manaforge-selector',
	templateUrl: './manaforge-selector.component.html',
	styleUrls: ['./manaforge-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforge[] {
		return this._manaforgeService.manaforges;
	}

	constructor(private _manaforgeService: ManaforgeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
