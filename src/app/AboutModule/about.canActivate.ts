import { OnInit , 
	     Injectable} from '@angular/core';
import { CanActivate , 
	     ActivatedRouteSnapshot ,
	     RouterStateSnapshot ,
	     Router } from '@angular/router';
import { AppService } from '../app.service';	     

@Injectable()
export class AboutCanActivate implements CanActivate , OnInit {

	constructor( private appService:AppService , 
		         private router:Router) {}

	ngOnInit() {

	}

	canActivate( route:ActivatedRouteSnapshot , 
		         router: RouterStateSnapshot) {
	
		if(!this.appService.isValidUser()) {
			this.router.navigate(['/login']);	
		}
		else {
			return true;
		}
	}
}