import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AlertModule  } from 'ng2-bootstrap/ng2-bootstrap';    

import { MenuComponent } from './menu.component'

@NgModule({
imports:[],
exports:[ 
          FormsModule , 
          ReactiveFormsModule ,
          HttpModule , 
          CommonModule,
          AlertModule,
          MenuComponent],
declarations:[MenuComponent],
providers:[]
})


export class SharedModule {

}