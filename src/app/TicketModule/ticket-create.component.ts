import { Title } from '@angular/platform-browser';
import { Component , 
         OnInit ,
         AfterViewInit ,
         ViewChild ,
         Renderer ,
         ElementRef } from '@angular/core';
import { TicketRequest ,
         Project , 
         Severity , 
         Comment , 
         Status } from './Ticket';
import { FormControl , 
         FormGroup , 
         FormBuilder , 
         Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TicketService } from './ticket.service';


import { AppService } from '../app.service';

					  	
@Component({
selector:'ticket-create',
templateUrl:'./ticket-create.component.html'
})

export class TicketCreateComponent implements OnInit , AfterViewInit   {

//-- public properties
fg:FormGroup;
projects: Observable<Array<Project>>;
severities: Observable<Array<Severity>>;
statuses: Observable<Array<Status>>;
@ViewChild('title') title: ElementRef;

private errorMessages = [
 {field:'title' , message:'Title is required.'},
 {field:'description' , message:'Description is required.'},
 {field:'projectID' , message:'Select a Project.'},
 {field:'severityID' , message:'Select a Severity.'},
 {field:'statusID' , message:'Select a Status.'},
 {field:'comments' , message:'Comment is required.'}

]

errors:Array<string> = [];

//-- Depdendency Injection
constructor( private fb: FormBuilder , 
             private service: TicketService ,
             private router: Router,
             title: Title ,
             private renderer: Renderer) { 
title.setTitle('Create Ticket Screen');
}

ngOnInit() {

 //-- create formgroup , Reactive form
 this.fg = this.fb.group({
                           "ticketID": [""],
                           "title":["" , Validators.compose([Validators.required , Validators.maxLength(50)])],
                           "description":["" , Validators.compose([Validators.required , Validators.maxLength(50)])],
                           "projectID":["" , Validators.required],
                           "severityID":["" , Validators.required],
                           "statusID":["" , Validators.required],                           
                           "comments": this.fb.array([

                           	this.fb.group({
                           	  "commentID": [1], 
                              "commentDate":[new Date()],
                              "commentText":["" , Validators.compose([Validators.required])]		
                           	})                          

                           	])
                         });


 //-- Get Projects
 this.projects = this.service.GetProjects();

 //-- Get Severities
 this.severities = this.service.GetSeverities();

 //-- Get Statuses
 this.statuses = this.service.GetStatuses();

}

//-- After view is initialized , set foucs on first field , "title"
ngAfterViewInit() {
this.renderer.invokeElementMethod(this.title.nativeElement,    
    'focus');
}

//-- submit the form
onSubmit(ticket:TicketRequest) {
   this.validateFields();	
 	console.log('Form Value: ' , this.fg.value);

    if(!this.errors.length) {
       console.log(ticket.title);
       this.service.AddTicket(ticket);       
       this.router.navigate(['/tickets/ticketsopen']);
       //this.router.navigate(['/home']);
    }

   
 }

 //-- reset the form
 onReset() {
 	this.fg.controls['title'].setValue('');
  this.fg.controls['description'].setValue('');
  this.fg.controls['projectID'].setValue('');
  this.fg.controls['severityID'].setValue('');
  this.fg.controls['statusID'].setValue('');
  this.fg.controls['comments'].setValue('');
 }

 //-- this method will check the if form is valid or not
 hasChanged():Boolean {
 	return this.fg.invalid && (this.fg.dirty || this.fg.touched) ? true : false;
 }

 validateFields() {
       this.errors = [];
       this.errorMessages.forEach( (ctrl) => {
       const control = this.fg.get(ctrl.field);
       if(!control.valid) {
          this.errors.push(ctrl.message);
       } 
    } );
 }



}