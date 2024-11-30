import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgespellService } from '../../services/manaforgespell.service';
import { Manaforgespell } from '../../interfaces/manaforgespell.interface';

@Component({
	selector: 'manaforgespell-selector',
	templateUrl: './manaforgespell-selector.component.html',
	styleUrls: ['./manaforgespell-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgespell[] {
		return this._manaforgespellService.manaforgespells;
	}

	constructor(private _manaforgespellService: ManaforgespellService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
