import { Title } from '@angular/platform-browser';
import { Component , 
	     OnInit ,
	     Renderer ,
	     ViewChild ,
	     ElementRef ,
	     AfterViewInit ,
		 DoCheck } from '@angular/core';
import { Router , 
	     ActivatedRoute } from '@angular/router';
import { FormBuilder , 
	     FormControl , 
	     FormGroup , 
	     FormArray ,
	     Validators }	from '@angular/forms'; 
import { Observable } from  'rxjs/Observable';

import { TicketService } from './ticket.service';
import { DashBoard , 
	     Project } from './Ticket';

@Component({
selector:'',
templateUrl:'./dash-board.component.html'
})


export class DashBoardComponent implements OnInit , AfterViewInit , DoCheck {

	dashboardDetails$:Observable<Array<DashBoard>>;
	projects$:Observable<Array<Project>>;
	selectedProject:Project;
	formgroup:FormGroup;
	@ViewChild('projectField') projectField:ElementRef;

	//dashboardDetails:
	constructor( private router:Router , 
		         private route:ActivatedRoute ,
		         private fb: FormBuilder ,
		         private service: TicketService,
		         title: Title ,
		         private renderer: Renderer) { 

		this.formgroup = this.fb.group({
			"projectID":["",Validators.compose([Validators.required])]
		});

		this.formgroup.controls['projectID'].valueChanges.subscribe( (value) => {
			console.log(value);
			alert('dashboard');
		   this.dashboardDetails$ = this.service.DashBoard(value);
		});

		title.setTitle('Dashboard Screen');
	}

	ngOnInit() {
		this.projects$ = this.service.GetProjects();		
	}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.projectField.nativeElement , 'focus');
	}
	
	ngDoCheck() {

	}

}