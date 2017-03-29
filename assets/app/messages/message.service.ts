import { Http, Response, Headers } from "@angular/http";

import { Injectable, EventEmitter } from "@angular/core";

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { Message } from "./message.model";
import { User } from '../auth/user.model';
import { ErrorService } from '../errors/error.service';


@Injectable()

export class MessageService {
	private messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();

	//event emitter 
	constructor(private http: Http, private errorService: ErrorService) { }

	//messages will be added to array 
	addMessages(message: Message) {

		//use http service to push to server 
		const body = JSON.stringify(message);

		//include headers in this request 
		const headers = new Headers({ 'Content-Type': 'text/plain' });

		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: "";

		//this sends an observable 
		return this.http.post('https://git.heroku.com/angular2-message.git/message/' + token, body, { headers: headers })
			.map((response: Response) => {
				const result = response.json();
				console.log(result);
				const message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
	}

	//reach out to the messages
	//send from the server side to the http 
	getMessages() {
		return this.http.get('https://git.heroku.com/angular2-message.git/message')
			.map((response: Response) => {
				const messages = response.json().obj;
				let transformedMessages: Message[] = [];
				for (let message of messages) {
					transformedMessages.push(new Message(
						message.content, message.user.firstName, message._id, message.user._id));
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
	}

	//place message in the top most edit box
	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	updateMessage(message: Message) {
		//reach out to the server to reach out to the 
		const body = JSON.stringify(message);
		const headers = new Headers({ 'Content-Type': 'application/json' });

		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: "";


		return this.http.patch('https://git.heroku.com/angular2-message.git/message/' + message.messageId + token, body, { headers: headers })
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
	}

	deleteMessage(message: Message) {
		console.log("Delete " + message.content);
		this.messages.splice(this.messages.indexOf(message), 1);
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: "";
			
		return this.http.delete('https://git.heroku.com/angular2-message.git/message/' + message.messageId + token)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
	}
} 