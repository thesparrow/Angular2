import { Component, Input } from "@angular/core";

import { Message } from "./message.model"; 
import { MessageService } from "./message.service"; 

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styles: [`
    	.author {
    		display: inline-block;
    		font-style: italic; 
    		fontsize: 12px;
    		width: 80%
    	}
    	.config { 
    		display: inline-block;
    		text-align: right;
    		font-size: 12px;
    		width: 19%
    	}
    `]
})

export class MessageComponent {
	//pass arguments to have access from the outside 
	@Input() message: Message; 
	@Output() editClicked = new EventEmitter<string>(); //generic type - classes can use multiple types

    constructor(private messageService: MessageService) {}  
    
    onEdit() {
		this.editClicked.emit('A new value');
	}

    onDelete() { 
        this.messageService.deleteMessage(this.message);
    }
}