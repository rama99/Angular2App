import { Component } from '@angular/core';

@Component({
selector:'',
template: `

<a routerLink="add">ADD</a>
<router-outlet name="router1"></router-outlet>
<router-outlet name="router2"></router-outlet>

`
})

export class TempRootComponent {}