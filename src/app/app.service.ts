import { Injectable , 
	      OnInit } from '@angular/core';
import { Http , 
	     Headers } from '@angular/http';
import { Observable }	from 'rxjs/Observable'; 
import { LoginRequest } from './Login'; 
import { User } from './User';

import 'rxjs/add/Observable/of';   

@Injectable()
export class AppService implements OnInit {

pageTitle:string;
userName:string;
fullName:string;
canActivate:boolean;

usersList:Array<User> = [
{userName:'user1' , password:'user1' , firstName:'F-1' , lastName:'L-1' , isActivte:true},
{userName:'user2' , password:'user2' , firstName:'F-2' , lastName:'L-2' , isActivte:true},
{userName:'user3' , password:'user3' , firstName:'F-3' , lastName:'L-3' , isActivte:true},
{userName:'user4' , password:'user4' , firstName:'F-4' , lastName:'L-4' , isActivte:true}
];

constructor(private http:Http) { }

ngOnInit() {
this.pageTitle = "Bug Tracker";
}

validateLogin(loginRequest:LoginRequest):Boolean {

//-- validate userName / Password
let user = this.usersList.find( (user:User) => {
	return (user.userName == loginRequest.login && user.password == loginRequest.password);
})

if(user)
{
 this.canActivate = true;
 this.userName = loginRequest.login;
 this.fullName = user.firstName + ' ' + user.lastName;
 localStorage.setItem('userName', this.userName);
 localStorage.setItem('fullName' , this.fullName);
 console.log('app service isValidUser()' , this.canActivate);	
 return true;
}
else 
{	
 this.canActivate = false;
 this.userName = '';
 console.log('app service isValidUser()' , this.canActivate)
 return false;
}

}

isValidUser():boolean {
 //-- add  logic to check for validation here..
 //-- check for a value in local storage
 console.log('app service isValidUser()' , this.canActivate)
 return this.canActivate;
}

logOut() {
		this.canActivate = false;
		this.userName = '';
		this.fullName = '';
}


}