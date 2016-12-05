import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component'

@NgModule({
imports:[],
exports:[ 
          FormsModule , 
          ReactiveFormsModule ,
          HttpModule , 
          CommonModule,
          MenuComponent],
declarations:[MenuComponent],
providers:[]
})


export class SharedModule {

}