import { Title } from '@angular/platform-browser';
import { Component , 
	     OnInit ,
	     AfterViewInit ,
	     Renderer ,
	     ElementRef ,
	     ViewChild  } from '@angular/core';
import { TicketService } from './ticket.service';
import { Observable } from 'rxjs/Observable';
import { TicketResponse , 
	     TicketRequest , 
	     Project , 
	     Severity , 
	     Status , 
	     TicketSearches } from './Ticket';
import { FormGroup , 
	     FormArray , 
	     FormBuilder , 
	     FormControl } from '@angular/forms';	      

@Component({
selector:'ticket-search',
templateUrl:'./tickets-search.component.html'
})


export class TicketsSearchComponent implements OnInit , AfterViewInit  {

	searchTickets$:Observable<Array<TicketResponse>>;
	projects$:Observable<Array<Project>>;
	statuses$:Observable<Array<Status>>;
	severties$:Observable<Array<Severity>>;
	selectedTicket:TicketResponse; 
	error:string;
	@ViewChild('projectField') projectField:ElementRef;

	formgroup: FormGroup;
	
	constructor( private service: TicketService , 
		         private fb: FormBuilder,
		         title:Title,
		         private renderer: Renderer) 
	{
		this.formgroup =  this.fb.group({
			                         "projectID": [""],
			                         "severityID":[""],
			                         "statusID":[""],
			                         "ticketID":[""]
		});

		title.setTitle('Ticket Search Screen');

	}

	ngOnInit() 
	{ 
		this.projects$ = this.service.GetProjects();
		this.statuses$ = this.service.GetStatuses();
		this.severties$ = this.service.GetSeverities();
		this.error = '';		
	}

	//-- after view is initialized 
	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.projectField.nativeElement , 'focus' );
	}

	onSearch() {

		this.error = '';
		//-- check if atleast one of the search criteria is selected
		if(this.formgroup.controls['projectID'].value == '' &&
			this.formgroup.controls['severityID'].value == '' &&
			this.formgroup.controls['statusID'].value == '' &&
			this.formgroup.controls['ticketID'].value == '') {
			this.error = "Select atleast one search criteria";
			return;
		}
		this.searchTickets$ = this.service.SearchTickets(this.formgroup.value);
	}

	onMoreDetails(ticket:TicketResponse) {
		this.selectedTicket = ticket;
	}
}