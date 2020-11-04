import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { Airline } from 'src/app/entities/airline/airline';
import { AirlineService} from 'src/app/services/airline/airline.service';
import { RentacarService} from 'src/app/services/rentacar/rentacar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from 'src/app/entities/location/location';

@Component({
  selector: 'app-newservice',
  templateUrl: './newservice.component.html',
  styleUrls: ['./newservice.component.css']
})
export class NewserviceComponent implements OnInit {

  serviceForm: FormGroup;
  path:string = "";
  rentacars: Array<Rentacar>;
  airlines: Array<Airline>;
  constructor(private route: ActivatedRoute, private airSer: AirlineService, private rentSer: RentacarService) 
  { 
    route.params.subscribe(params => {this.path = params['id']; });   
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
  {
    this.serviceForm = new FormGroup({
      'serviceName': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9]*')]),
      'city': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }

  createNewService()
  {
    var loc = new Location(this.serviceForm.controls["city"].value, this.serviceForm.controls["address"].value, this.serviceForm.controls["number"].value, 0, 0);
    if(this.path == "airline")
    {

      var newAirline = new Airline(-1, this.serviceForm.controls["serviceName"].value, loc);
      this.airSer.addNewService(newAirline).subscribe(
        (res: any) => {
          alert("Success");
        },
        err => {
          alert("Error " + err);
        }
      );
      //alert("success");
    }
    else
    {
      var newRentacar = new Rentacar(-1, this.serviceForm.controls["serviceName"].value, loc);
      this.rentSer.addNewService(newRentacar).subscribe(
        (res: any) => {
          alert("Success");
        },
        err => {
          alert("Error " + err);
        }
      );
      //alert("success");
    }

    this.serviceForm.reset();
  }

  findNewId():number
  {
    var a = 0;
    var contains = false;
    while(true)
    {
      if(this.path == "airline")
      {
        this.airlines.forEach(val => {
          if(val.id == a)
          {
            contains = true;
            return;
          }
        });
      }
      else
      {
        this.rentacars.forEach(val => {
          if(val.id == a)
          {
            contains = true;
            return;
          }
        });
      }
      

      if(!contains)
      {
        return a;
      }
      else
      {
        ++a;
        contains = false;
      }
    }
  }

}
