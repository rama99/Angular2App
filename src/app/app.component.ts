import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit {
 title = 'Bug tracker';
 userName = '';
 isValidUser:boolean;

 constructor( private router:Router , 
 	          public service:AppService 
 	          ) {

 }

 ngOnInit() {
 this.userName = this.service.userName; 	
 }

 onLogOut() {
 	this.service.logOut(); 	 
 	this.router.navigate(['/login']);	
 }

}
