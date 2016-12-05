import { Title } from '@angular/platform-browser';
import { Component , OnInit } from '@angular/core';

@Component({
selector:'',
template:'404'
})


export class PageNotFoundComponent implements OnInit {

constructor(title: Title) {
title.setTitle('Page Not Found Screen');	
}

ngOnInit() {

}

}