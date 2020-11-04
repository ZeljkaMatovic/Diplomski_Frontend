import { Component, OnInit, Input } from '@angular/core';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Location } from 'src/app/entities/location/location';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-rentacar',
  templateUrl: './edit-rentacar.component.html',
  styleUrls: ['./edit-rentacar.component.css']
})
export class EditRentacarComponent implements OnInit {

  constructor(private rentSer: RentacarService, private route: ActivatedRoute) { 
    route.params.subscribe(params => {this.id = params['id']; });
    this.rentForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9-]*')]),
      'descr': new FormControl("", [Validators.required]),
      'city': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }
  id: number;
  service: Rentacar;
  rentForm: FormGroup;
  ngOnInit(): void {
    this.rentSer.findRentacarInBase(this.id).subscribe(
      (res : any) => {
        this.service = res as Rentacar;
        this.initForm();
      }
    )
    
  }

  initForm()
  {
    this.rentForm = new FormGroup({
      'name': new FormControl(this.service.nameOfService, [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9-]*')]),
      'descr': new FormControl(this.service.descriptionOfService, [Validators.required]),
      'city': new FormControl(this.service.location.nameOfCity, [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl(this.service.location.nameOfStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl(this.service.location.numberInStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }

  modify()
  {
    var rentacar = new Rentacar(this.service.id, this.rentForm.controls["name"].value,
     new Location(this.rentForm.controls["city"].value, this.rentForm.controls["address"].value,
      this.rentForm.controls["number"].value, 0 , 0));
    rentacar.descriptionOfService = this.rentForm.controls["descr"].value;
    this.rentSer.editInfo(rentacar);
  }

}
