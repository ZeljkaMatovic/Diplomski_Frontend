import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/users';

@Component({
  selector: 'app-baggage',
  templateUrl: './baggage.component.html',
  styleUrls: ['./baggage.component.css']
})
export class BaggageComponent implements OnInit {
  
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

}
