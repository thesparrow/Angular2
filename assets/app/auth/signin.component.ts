import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from './auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})

export class SigninComponent {
	myForm: FormGroup;

	constructor(private authService: AuthService) { }

	onSubmit() {
		console.log(this.myForm);
		this.myForm.reset();
	}

	ngOnInit() {
		this.myForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
			]),
			password: new FormControl('', Validators.required)
		});
	}
}