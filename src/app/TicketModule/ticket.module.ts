import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { TicketCreateComponent } from './ticket-create.component';
import { TicketService } from './ticket.service';
import { ticketCanActivateChild } from './ticket.canActivate';
import { TicketCreateDeactivate } from './ticket-create.canDeactivate';
import { TicketDetailComponent } from './ticket-detail.component';
import { OpenTicketsComponent } from './open-tickets.component';
import { TicketsSearchComponent } from './tickets-search.component';
import { DashBoardComponent } from './dash-board.component';
import { TicketEditComponent } from './ticket-edit.component';
import { TicketHomeComponent } from './ticket-home.component';

import { SharedModule } from '../sharedModule/shared.module';

@NgModule({
imports:[
          SharedModule,
          RouterModule.forChild(
	      [
	        
           {path:'tickets' , component:TicketHomeComponent , canActivateChild:[ticketCanActivateChild],
           children: [

           {path:'ticketcreate' ,  component:TicketCreateComponent ,  canDeactivate:[TicketCreateDeactivate] },
           {path:'ticketsopen' ,   component:OpenTicketsComponent} ,
           {path:'' , redirectTo: 'ticketsopen'} ,
           {path:'ticketssearch' , component:TicketsSearchComponent},
           {path:'edit/:id' , component:TicketEditComponent},
           {path:'dashboard'     , component:DashBoardComponent}

          ] }
          
	      ])
	],
exports:[],
declarations:[ TicketCreateComponent , 
               TicketDetailComponent ,
               OpenTicketsComponent ,
               TicketsSearchComponent ,
               DashBoardComponent ,
               TicketEditComponent ,
               TicketHomeComponent
               ],
providers:[  TicketService ,
             ticketCanActivateChild ,             
             TicketCreateDeactivate]
})

export class TicketModule { }