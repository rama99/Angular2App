import { Injectable } from   '@angular/core';

import { CanActivate , 
	     CanActivateChild,
	     ActivatedRouteSnapshot , 
	     RouterStateSnapshot ,
	     Router } from '@angular/router';

import { AppService , }	from '../app.service';    

@Injectable()
export class ticketCanActivateChild implements CanActivateChild {

	constructor(private appService:AppService ,
		        private router:Router ) {

	}

	canActivateChild( route:ActivatedRouteSnapshot , 
		         router: RouterStateSnapshot) 
	{	
		if(!this.appService.isValidUser()) {
			this.router.navigate(['/login']);
			return false;
		}
		else {
			return true;
		}
				
	}
}