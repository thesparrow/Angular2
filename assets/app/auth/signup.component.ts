import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit{ 
	myForm: FormGroup; 

	onSubmit() {
		console.log(this.myForm);
	}

	ngOnInit() {
		this.myForm = new FormGroup({
			firstName: new FormControl('',Validators.required), 
			lastName: new FormControl('',Validators.required), 
			email: new FormControl('',[
					Validators.required,
					Validators.pattern("^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")
				]), 
			password: new FormControl('', Validators.required)
		});
	}
}