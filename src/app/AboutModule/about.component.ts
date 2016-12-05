import { Title } from '@angular/platform-browser';
import { Component , 
	     OnInit ,
	     ViewChild ,
	     ElementRef ,
	     Renderer ,
	     AfterViewInit } from '@angular/core';	     


@Component({
selector:'about1',
templateUrl:'./about.html'
})


export class AboutComponent implements OnInit  { 

title:string = "test title";
@ViewChild('temp') tempVar:ElementRef;

constructor(title:Title , private renderer:Renderer ) {
	
title.setTitle('About Screen');
}

ngOnInit() {

 } 

 onSubmit(value) {
 	console.log(value);
 }

}