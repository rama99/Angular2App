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

	private TicketsCollection = [
			/*{ ticketID:1 , title:'Title-1' , description:'Desc-1' ,
		      projectName:'proj-1' , severityName:'S-1' , statusText:'status-1',
              createdDate:new Date(),comments:[ 
              {commentID:11 , commentDate:'date here-11' , commentText:'comment text-11'},
              {commentID:12 , commentDate:'date here-12' , commentText:'comment text-12'}
              ]
		    },
		    { ticketID:2 , title:'Title-2' , description:'Desc-2' ,
		      projectName:'proj-2' , severityName:'S-2' , statusText:'status-2',
              createdDate:new Date(),comments:[ 
              {commentID:21 , commentDate:'date here-21' , commentText:'comment text-21'},
              {commentID:22 , commentDate:'date here-22' , commentText:'comment text-22'}
              ] 
		    }*/
		];

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

		let dashBoardDetails = [
			{projectName:'Banking' , statusText:'LOW' , statusCount:90},
			{projectName:'Insurance' , statusText:'MEDIUM' , statusCount:92}
		];

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

	private GetNewTicketID():number {
		return this.TicketsCollection.length + 1;
	}	
}