import { BrowserModule , Title } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule , 
         CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './404.component';
import { AppCanActivate } from './app.canActivate';

import { AppService } from './app.service';
import { AboutModule } from './aboutModule/about.module';
import { TicketModule } from './TicketModule/ticket.module';
import { SharedModule } from './sharedModule/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    //HttpModule ,
    RouterModule.forRoot([
        {path:'login' , component:LoginComponent },
        {path:'home' , component:HomeComponent , canActivate:[AppCanActivate]},
        {path:'**' , component:PageNotFoundComponent}
      ]),
    AboutModule,
    TicketModule,
    SharedModule
  ],
  providers: [ AppService , 
               Title , 
               AppCanActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
