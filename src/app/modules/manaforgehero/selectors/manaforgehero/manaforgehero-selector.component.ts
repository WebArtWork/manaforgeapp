import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgeheroService } from '../../services/manaforgehero.service';
import { Manaforgehero } from '../../interfaces/manaforgehero.interface';

@Component({
	selector: 'manaforgehero-selector',
	templateUrl: './manaforgehero-selector.component.html',
	styleUrls: ['./manaforgehero-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgehero[] {
		return this._manaforgeheroService.manaforgeheros;
	}

	constructor(private _manaforgeheroService: ManaforgeheroService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
