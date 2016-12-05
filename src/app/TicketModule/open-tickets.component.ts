import { Title } from '@angular/platform-browser';                 
import { Component , 
	     OnInit , 
	     ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TicketService } from './ticket.service';
import { TicketResponse } from './Ticket';
import { Observable } from 'rxjs/Observable';


@Component({
selector:'open-tickets',
templateUrl:'./open-ticket.component.html'
})


export class OpenTicketsComponent implements OnInit{

	openTickets$:Observable<Array<TicketResponse>>;
	selectedTicket:TicketResponse;

	constructor( private service: TicketService ,
		         private router: Router,
		         title: Title ) { 
		title.setTitle('Open Tickets Screen');
	}

	ngOnInit() { 
		this.openTickets$ = this.service.OpenTickets();
	}

	onMoreDetails(ticket:TicketResponse) {
			console.log(ticket);
			this.selectedTicket = ticket;			
	}

	onEdit(id) {
		this.router.navigate(['tickets/edit' , id]);
	}
} 