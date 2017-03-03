import { Routes, RouterModule} from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";


const APP_ROUTES: Routes = [ //array 
	{ path: '', redirectTo: '/messages', pathMatch: 'full'}, //append to domain 
	{ path: 'messages', component: MessagesComponent }, //javascript object 
	{ path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES} //javascript object 
]; 

export const routing = RouterModule.forRoot(APP_ROUTES);
