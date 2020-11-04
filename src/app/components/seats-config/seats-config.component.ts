import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seats-config',
  templateUrl: './seats-config.component.html',
  styleUrls: ['./seats-config.component.css']
})
export class SeatsConfigComponent implements OnInit {

  loggedIn : boolean;

  constructor() { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("isloggedin"));
  }

}
