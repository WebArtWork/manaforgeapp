import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgeschoolService } from '../../services/manaforgeschool.service';
import { Manaforgeschool } from '../../interfaces/manaforgeschool.interface';

@Component({
	selector: 'manaforgeschool-selector',
	templateUrl: './manaforgeschool-selector.component.html',
	styleUrls: ['./manaforgeschool-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgeschool[] {
		return this._manaforgeschoolService.manaforgeschools;
	}

	constructor(private _manaforgeschoolService: ManaforgeschoolService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
