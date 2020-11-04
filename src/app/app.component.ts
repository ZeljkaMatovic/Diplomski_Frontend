import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PUSGS-WebProjekat';
  public chatSocket: WebSocket;

  ngOnInit() {
    //localStorage.setItem("isloggedin", JSON.stringify(false));
  }

  public initChatSocket(username: string) {
    this.chatSocket = new WebSocket('wss://localhost:44391/ws');

    this.chatSocket.onmessage = (event) => {
      if (event.data == 'conAccepted') {
        this.chatSocket.send('connConfUsername~' + username);
      }

    };
  }
}
