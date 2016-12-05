import { Component , 
	     OnInit } from '@angular/core';

import { Title }	from '@angular/platform-browser';      

@Component({
selector:'home',
templateUrl:'./home.component.html'
})


export class HomeComponent implements  OnInit {

constructor(title: Title) {
	title.setTitle('Home Screen');
}

ngOnInit() {}

}