import { Title } from '@angular/platform-browser';
import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector:'',
template:`
<div class="row">
Page Not Found 404<br>
<a routerLink="/home">Home Screen</a>
</div>

`
})


export class PageNotFoundComponent implements OnInit {

constructor(title: Title) {
title.setTitle('Page Not Found Screen');	
}

ngOnInit() {

}

}