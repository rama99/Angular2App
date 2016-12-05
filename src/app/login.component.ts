import { Title } from '@angular/platform-browser';
import { Component  , 
         OnInit ,
         AfterViewInit ,
         ElementRef ,
         Renderer ,
         ViewChild  } from '@angular/core';
import { FormBuilder ,
         FormControl ,
         FormGroup ,
         FormArray ,
         Validators } from '@angular/forms';

import { Router ,
         ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';   
import { LoginRequest } from './Login';                

@Component({
selector:'login',
templateUrl:'./login.component.html'
})


export class LoginComponent implements OnInit , AfterViewInit {


formgroup:FormGroup;
error:string;
@ViewChild('login') login:ElementRef;
constructor( private fb:FormBuilder , 
	           private router: Router ,
             private service: AppService,
             title: Title ,
             private renderer: Renderer) { 
title.setTitle("Login Screen");
}

ngOnInit() {

  this.formgroup = this.fb.group({
  					"login":["",Validators.compose([Validators.required])],
  					"password":["" , Validators.compose([Validators.required])]
                   });
}

ngAfterViewInit() {
  this.renderer.invokeElementMethod(this.login.nativeElement,'focus');
}

OnSubmit(loginRequest:LoginRequest) {
this.error = "";
if(!this.isValidForm()) {
this.error = "Enter UserId/Password";
}
else if(!this.service.validateLogin(loginRequest)) 
{
this.error = "Invalid UserID/Password";
this.formgroup.reset();
}
else {
this.router.navigate(['/home']);  
}

}

private isValidForm():Boolean {
 return this.formgroup.valid ? true: false;
}

}