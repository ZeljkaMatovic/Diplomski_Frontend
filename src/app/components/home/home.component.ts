import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public imagesUrl;
  username: string;

  constructor(private route: ActivatedRoute, service: RegistrateService) {
    route.params.subscribe(params => {this.username = params['username']; });
    console.log(this.username);
  }

  ngOnInit(): void {

    this.imagesUrl = ['../assets/india.jpeg', '../assets/london.jpeg', '../assets/maldives.jpg', '../assets/singapore.jpg'];
  
  }

}
