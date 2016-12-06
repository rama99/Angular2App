export interface TicketRequest {
  ticketID: number;
  title: string;
  description: string;
  projectID: string;
  severityID: string;
  statusID: string;
  comments: Array<Comment>;
  createdDate: Date;
}

export interface TicketResponse {
  ticketID: number;
  title: string;
  description: string;
  projectName: string;
  severityName: string;
  statusText: string;
  comments: Array<Comment>;
  createdDate: Date;
}

export interface Project {
	projectID: string;
	projectName: string;
}

export interface Severity {
	severityID: string;
	severityName: string;
}

export interface Comment {
   commentID: number;
   commentDate: Date;
   commentText: string;
}

export interface Status {
	statusID: string;
	statusText: string;
}

export interface TicketSearches {
  projectID:string;
  severityID:string;
  statusID:string;
  ticketID:number;
  //ticketID:string;
}

export interface DashBoard {
  projectName:string;
  severityName:string;
  statusText:string;
  statusCount:number;
}

