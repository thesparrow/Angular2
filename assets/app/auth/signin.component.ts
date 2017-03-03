import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})

export class SigninComponent{ 
	myForm: FormGroup; 

	onSubmit() {
		console.log(this.myForm);
	}

	ngOnInit() {
		this.myForm = new FormGroup({			
			email: new FormControl('',[
					Validators.required,
					Validators.pattern("^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")
				]), 
			password: new FormControl('', Validators.required)
		});
	}
}