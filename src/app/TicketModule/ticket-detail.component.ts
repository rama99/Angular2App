import { Component , OnInit , Input , OnChanges , SimpleChanges } from '@angular/core';
import { TicketRequest , TicketResponse } from './Ticket';

@Component({
selector:'ticket-detail',
templateUrl:'./ticket-detail.component.html'
})


export class TicketDetailComponent implements  OnInit  , OnChanges{

	@Input()	
	ticket: TicketResponse;

	constructor() { }
	
	ngOnInit() {

	}

	ngOnChanges(change:SimpleChanges) {
		console.log('change' , this.ticket);
	}
}