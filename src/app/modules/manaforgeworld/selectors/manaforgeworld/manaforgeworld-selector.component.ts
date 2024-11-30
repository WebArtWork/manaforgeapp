import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgeworldService } from '../../services/manaforgeworld.service';
import { Manaforgeworld } from '../../interfaces/manaforgeworld.interface';

@Component({
	selector: 'manaforgeworld-selector',
	templateUrl: './manaforgeworld-selector.component.html',
	styleUrls: ['./manaforgeworld-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgeworld[] {
		return this._manaforgeworldService.manaforgeworlds;
	}

	constructor(private _manaforgeworldService: ManaforgeworldService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
