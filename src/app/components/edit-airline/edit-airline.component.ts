import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Airline } from 'src/app/entities/airline/airline';
import { Location } from 'src/app/entities/location/location';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-edit-airline',
  templateUrl: './edit-airline.component.html',
  styleUrls: ['./edit-airline.component.css']
})
export class EditAirlineComponent implements OnInit {

  @Input() airline: Airline;
  airlineForm: FormGroup;

  constructor(public service: AirlineService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
  {
    this.airlineForm = new FormGroup({
      'name': new FormControl(this.airline.nameOfAirline, [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9]*')]),
      'descr': new FormControl(this.airline.descriptionOfAirline, [Validators.required]),
      'city': new FormControl(this.airline.location.nameOfCity, [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl(this.airline.location.nameOfStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl(this.airline.location.numberInStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }

  modify()
  {
    var airlineNew = new Airline(this.airline.id, this.airlineForm.controls["name"].value,
     new Location(this.airlineForm.controls["city"].value, this.airlineForm.controls["address"].value,
      this.airlineForm.controls["number"].value, 0 , 0));
    airlineNew.descriptionOfAirline = this.airlineForm.controls["descr"].value;
    this.service.editInfo(airlineNew);

  }

}