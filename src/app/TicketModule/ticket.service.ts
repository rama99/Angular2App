import { Injectable  } from '@angular/core';
import { TicketRequest , 
	     TicketResponse , 
	     Project , 
	     Severity , 
	     Comment , 
	     Status ,
	     DashBoard ,
	     TicketSearches } from './Ticket';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/Observable/of';

@Injectable()
export class TicketService
{	

	private TicketsCollection = [];

	constructor(private http:Http) { }

	GetProjects():Observable<Array<Project>> {

		let projects = [
		  {projectID:"",  projectName:'Select a Project'},
		  {projectID:'Banking' , projectName:'Banking'},
		  {projectID:'Insurance' , projectName:'Insurance'}
		];

		let ObservableProjects = Observable.of(projects);
		return ObservableProjects;
	}

	GetSeverities():Observable<Array<Severity>> {

		let severities = [
		    {severityID:'' , severityName:'Select a Severity'},
			{severityID:'LOW' , severityName:'LOW'},
			{severityID:'MEDIUM' , severityName:'MEDUIM'}
		];

		return Observable.of(severities);		
	} 

	GetStatuses():Observable<Array<Status>> {

		let statuses = [
		    {statusID:'' , statusText:'Select a Status'},
			{statusID:'OPEN' , statusText:'OPEN'},
			{statusID:'PENDING' , statusText:'PENDING'},
			{statusID:'NOT A BUG' , statusText:'NOT A BUG'},
			{statusID:'CLOSED' , statusText:'CLOSED'}
		];

		return Observable.of(statuses);		 
	}

	OpenTickets(): Observable<Array<TicketResponse>> {

		let OpenTickets = this.TicketsCollection;

		return Observable.of(OpenTickets.filter((ticket:TicketResponse) => {
			return ticket.statusText == "OPEN";
		}));	
	}

	SearchTickets(searchOptions:TicketSearches): Observable<Array<TicketResponse>> {

		    let SearchTickets:Array<TicketResponse> = this.TicketsCollection;

		    //-- TicketID search option
			console.log('Ticket ID' , +searchOptions.ticketID , +searchOptions.ticketID);

			let ticketID = +searchOptions.ticketID;
		    if(ticketID > 0) 
		    {
		    SearchTickets = this.TicketsCollection.filter((ticket:TicketResponse) => {				
				return ticket.ticketID == ticketID;
			});
		    }
						

		    //-- Ticket status search option
		    if(searchOptions.statusID != "") {
		    	SearchTickets = SearchTickets.filter((ticket:TicketResponse) => {
		    		return ticket.statusText == searchOptions.statusID
		    	});
		    }

		    //-- Ticket Severity option
		    if(searchOptions.severityID != "") {
		    	SearchTickets = SearchTickets.filter((ticket:TicketResponse) => {
		    		return ticket.severityName == searchOptions.severityID;
		    	})
		    }

			//-- Ticket Project option
		    if(searchOptions.projectID != "") {
		    	SearchTickets = SearchTickets.filter((ticket:TicketResponse) => {
		    		return ticket.projectName == searchOptions.projectID;
		    	})
		    }

		return Observable.of(SearchTickets);
	}

	GetTicketByID(ticketID:any): Observable<TicketResponse> {
		
		let ticket = this.TicketsCollection.find( (ticket) => ticket.ticketID == ticketID);
		return Observable.of(ticket);
	}

	DashBoard(projectID: number):Observable<Array<DashBoard>> {

	/*	let dashBoardDetails = [
			{projectName:'Banking' , statusText:'LOW' , statusCount:92},
			{projectName:'Insurance' , statusText:'MEDIUM' , statusCount:92}
		];*/

		let dashBoardDetails = this.TicketsCollection.map( (t:TicketResponse) => {
			return {'projectName': t.projectName , 'severityName':t.severityName , 'statusText': t.statusText}
		}) 

		return Observable.of(dashBoardDetails);
	}

	AddTicket(ticket: TicketRequest) {

		try {

		
		let addTicket:TicketResponse = { "ticketID": this.GetNewTicketID() ,
		                                 "title": ticket.title , 
		                                 "statusText": ticket.statusID ,
		                                 "severityName":ticket.severityID,
		                                 "projectName":ticket.projectID,
		                                 "description":ticket.description,
		                                 "createdDate":new Date(),
		                                 "comments": ticket.comments		                                 
		                               };		                             

		this.TicketsCollection.push(addTicket); 

		}
		catch(err) {
			alert(err);
		}
	}

	EditTicket(ticket: TicketRequest) {

		let ediItem:Array<TicketResponse> = this.TicketsCollection.filter( (e:TicketRequest) => {
			return e.ticketID == ticket.ticketID;
		});

		ediItem[0].title = ticket.title;
		ediItem[0].description = ticket.description;	
		ediItem[0].projectName = ticket.projectID;
		ediItem[0].statusText = ticket.statusID;
		ediItem[0].severityName = ticket.severityID;

		let commentID: number = ediItem[0].comments.length + 1;
		ticket.comments[0].commentID = commentID;
		ticket.comments[0].commentDate = new Date();

		ediItem[0].comments.push(ticket.comments[0]);

	}

	private GetNewTicketID():number {
		return this.TicketsCollection.length + 1;
	}	
}