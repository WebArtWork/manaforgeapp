import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ManaforgeartifactService } from '../../services/manaforgeartifact.service';
import { Manaforgeartifact } from '../../interfaces/manaforgeartifact.interface';

@Component({
	selector: 'manaforgeartifact-selector',
	templateUrl: './manaforgeartifact-selector.component.html',
	styleUrls: ['./manaforgeartifact-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Manaforgeartifact[] {
		return this._manaforgeartifactService.manaforgeartifacts;
	}

	constructor(private _manaforgeartifactService: ManaforgeartifactService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
