import { Title } from '@angular/platform-browser';
import { Component , OnInit } from '@angular/core';
import { FormControl , 
	     FormBuilder , 
	     FormGroup , 
	     FormArray ,
	     Validators } from '@angular/forms';
import { Observable }	from 'rxjs/Observable';
import { Router , 
	     ActivatedRoute ,
	     Params } from '@angular/router';     

import { Project , 
	     Severity , 
	     Status , 
	     TicketRequest , 
	     TicketResponse } from './Ticket';
import { TicketService } from './ticket.service';


@Component({
selector:'ticket-edit',
templateUrl:'./ticket-edit.component.html'
})


export class TicketEditComponent implements OnInit {

	projects$: Observable<Array<Project>>;
	severities$:Observable<Array<Severity>>;
	statuses$:Observable<Array<Status>>;

	editTicket:TicketResponse;
	errors:Array<string> = [];
	fg:FormGroup;
	id:number;

	private errorMessages = [
 								{field:'title' , message:'Title is required.'},
 								{field:'description' , message:'Description is required.'},
 								{field:'projectID' , message:'Select a Project.'},
 								{field:'severityID' , message:'Select a Severity.'},
 								{field:'statusID' , message:'Select a Status.'},
 								{field:'comments' , message:'Comments are required.'}
							];

	constructor( private service: TicketService ,
	             private fb: FormBuilder ,
	             private route: ActivatedRoute ,
	             title: Title,
				 private router: Router
	           ) 
	{ 

		this.fg = this.fb.group({
			"ticketID":[""],
			"title":["",Validators.compose([Validators.required])],
			"description":["" , Validators.compose([Validators.required])],
			"projectID":["" , Validators.compose([Validators.required])],
			"severityID":["" , Validators.compose([Validators.required])],
			"statusID":["" , Validators.compose([Validators.required])],
			"comments": this.fb.array([
					this.initComment(), 
				])
		});

		title.setTitle('Edit Ticket Screen');
	}
	
	ngOnInit() 
	{
		
		this.projects$ = this.service.GetProjects();
		this.severities$ = this.service.GetSeverities();
		this.statuses$ = this.service.GetStatuses();

		this.route.params.forEach( (params:Params) => {
			this.id = +params['id'];		
		});

		this.service.GetTicketByID(this.id).subscribe( (ticket) => {
			this.editTicket = ticket;
		});

		this.fg.controls['title'].setValue(this.editTicket.title);
		this.fg.controls['description'].setValue(this.editTicket.description);
		this.fg.controls['projectID'].setValue(this.editTicket.projectName);
		this.fg.controls['severityID'].setValue(this.editTicket.severityName);
		this.fg.controls['statusID'].setValue(this.editTicket.statusText);
		//this.fg.controls['commentText']
		// this.fg.controls['description']
		this.AddComment();
		this.AddComment();
	}

	initComment() {
		return		this.fb.group({
                           	  "commentID": [""], 
                              "commentDate":[""],
                              "commentText":["comment text" , Validators.compose([Validators.required])]		
                           	  });
	}

	AddComment() {
		const control = <FormArray>this.fg.controls['comments'];
		control.push(this.initComment());
	}

onEdit(editRequest: any) {
alert('Need to add edit save logic');
this.router.navigate(['tickets/ticketsopen']);

}

}