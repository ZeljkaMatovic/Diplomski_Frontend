import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entities/users/users';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  reciever: string;
  chatSocket: WebSocket;
  user: User;
  styleSender = 'style="background-color: rgb(255, 0, 0, 0.8); color: black; height: fit-content; width: fit-content; margin: 2px; padding: 7px; border-radius: 7px; float: right; clear: both; background-image: linear-gradient(#fa7d09cc, #ffff00cc);"';
  styleReceiver = 'style="background-color: rgba(128, 0, 128, 0.8); color: whitesmoke; height: fit-content; width: fit-content; margin: 2px; padding: 7px; border-radius: 7px; float: left; clear: both; background-image: linear-gradient(#800080cc, #ee82eecc);"';

  @ViewChild('mainArea', { static: false }) mainArea: ElementRef;
  @ViewChild('answer', { static: false }) answer: ElementRef;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.reciever = params['id']; });
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    this.chatSocket = new WebSocket('wss://localhost:44391/ws');

    this.chatSocket.onmessage = (event) => {
      if (event.data == 'conAccepted') {
        this.chatSocket.send('connConfUsername~' + this.user.userName);
      } else {
        this.mainArea.nativeElement.innerHTML = this.mainArea.nativeElement.innerHTML + '<div class="receiver" ' + this.styleReceiver + '>' + event.data + '</div>';
        (<HTMLInputElement>document.getElementById("mainArea")).scrollTop = (<HTMLInputElement>document.getElementById("mainArea")).scrollHeight;
      }

    };
  }

  sendMessage() {
    this.mainArea.nativeElement.innerHTML = this.mainArea.nativeElement.innerHTML + '<div class="sender" ' 
    + this.styleSender + '>'+ this.answer.nativeElement.value + '</div>';

    this.chatSocket.send(this.user.userName + '~' + this.reciever + '~' + this.answer.nativeElement.value);
    (<HTMLInputElement>document.getElementById("mainArea")).scrollTop = (<HTMLInputElement>document.getElementById("mainArea")).scrollHeight;
    
    this.answer.nativeElement.value = '';
  }

  keyPressed(event) {
    if (event.keyCode === 13)
      this.sendMessage();
  }

}
