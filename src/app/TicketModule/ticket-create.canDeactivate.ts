import { CanDeactivate } from '@angular/router';
import { TicketCreateComponent } from './ticket-create.component';

export class TicketCreateDeactivate implements CanDeactivate<TicketCreateComponent> {

	canDeactivate(target: TicketCreateComponent) {
		return true;
	}
}