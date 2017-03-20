import { Http,Response,Headers } from "@angular/http"; 

import { Injectable, EventEmitter } from "@angular/core"; 

import { Observable} from "rxjs"; 
import 'rxjs/Rx';

import { Message } from "./message.model"; 


@Injectable()

export class MessageService {
	private messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();

	//event emitter 
	constructor(private http: Http) {}

	//messages will be added to array 
	addMessages(message: Message){
		//use http service to push to server 
		const body = JSON.stringify(message); 
		//include headers in this request 
		const headers = new Headers({'Content-Type': 'application/json'});
		//this sends an observable 
		return this.http.post('http://localhost:3000/message', body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(result.obj.content, 'Dummy', result.obj._id, null); 
				this.messages.push(message);
				return message; 
			})		
			.catch((error: Response) => Observable.throw(error.json()));
			//give the data that was attached to the response 

	}

	//reach out to the messages
	//send from the server side to the http 
	getMessages(){
		return this.http.get('http://localhost:3000/message')
			.map((response: Response) => {
				const messages = response.json().obj; 
				let transformedMessages: Message[] = [];
				for (let message of messages){
					transformedMessages.push(new Message(
						message.content, 'Dummy', message._id, null));
				}
				this.messages = transformedMessages; 
				return transformedMessages;
			})
			.catch((error: Response) => Observable.throw(error.json()));		
	}

	//place message in the top most edit box
	editMessage(message: Message){
		this.messageIsEdit.emit(message); 
	}

	updateMessage(message: Message){
		//reach out to the server to reach out to the 
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
			.map((response: Response ) => response.json())
			.catch((error: Response) => Observable.throw(error.json())); 
	}

	deleteMessage(message: Message){
		console.log("Delete " + message.content); 
		this.messages.splice(this.messages.indexOf(message), 1);
		this.messages.forEach(function(m){
			console.log(" message "+ m.content); 
		 }); 
		return this.http.delete('http://localhost:3000/message/' + message.messageId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}
} 