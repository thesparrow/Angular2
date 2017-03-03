import { Component } from "@angular/core";

@Component({
	selector: 'app-logout',
	template: `
		<div class="col-md t col-md-offset-2">
			<button class="btn btn-danger" (click) = "onLogout()">Logout</button>
		</div>
	`
})

export class LogoutComponent{ 
	onLogout(){
		
	}
}