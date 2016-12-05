import { CanActivate , 
         ActivatedRouteSnapshot ,
         RouterStateSnapshot ,
         Router } from '@angular/router';
import { Injectable ,
         OnInit } from '@angular/core'; 

import { AppService } from './app.service';                 

 @Injectable()
 export class AppCanActivate implements OnInit , CanActivate {

 	constructor( private router: Router , 
 		         private appService: AppService) { }

 	ngOnInit() { }

 	canActivate(route: ActivatedRouteSnapshot , router: RouterStateSnapshot) {
 		if(!this.appService.isValidUser()) 
 		{ 			
 			this.router.navigate(['/login']);
 			return false;
 		}
 		else 
 		{
 			return true;
 		} 		
 	}
 }        

