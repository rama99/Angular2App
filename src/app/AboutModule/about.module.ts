import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { SharedModule } from '../sharedModule/shared.module';
import { AppModule } from '../app.module';
import { AboutCanActivate } from './about.canActivate';

@NgModule({
imports:[
RouterModule.forChild([
		{path:'about' , component:AboutComponent , canActivate: [AboutCanActivate]}
	]),
SharedModule
],
exports:[],
declarations:[ AboutComponent 
               ],
providers:[AboutCanActivate]
})


export class AboutModule { }