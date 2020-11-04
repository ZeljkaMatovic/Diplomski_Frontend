import { Component, OnInit } from '@angular/core';
import { Branch, Vehicle, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from 'src/app/entities/location/location'
import { RCSAdmin } from 'src/app/entities/users/users';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service'

@Component({
  selector: 'app-newbranch',
  templateUrl: './newbranch.component.html',
  styleUrls: ['./newbranch.component.css']
})
export class NewbranchComponent implements OnInit {

  branchForm : FormGroup;
  service: Rentacar;
  vehicles: Array<Vehicle> = new Array<Vehicle>();
  toCreate: Vehicle;
  serviceId: number; 
  pressed: boolean = false;
  constructor(private rentSer: RentacarService) { 
    this.serviceId = (JSON.parse(localStorage.getItem("user")) as RCSAdmin).serviceId;
    this.service = this.rentSer.findRentacar(this.serviceId);
    console.log(this.serviceId);
    this.vehicles = [];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
  {
    this.branchForm = new FormGroup({
      'branchName': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9]*')]),
      'city': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }

  createNewBranch()
  {
    var loc = new Location(this.branchForm.controls["city"].value, this.branchForm.controls["address"].value, this.branchForm.controls["number"].value, 0, 0);
    var branch = new Branch(-1, this.serviceId, this.branchForm.controls["branchName"].value, loc);
    this.vehicles.forEach(v => {
      v.rentacarID = this.serviceId;
      v.branchID = branch.id;
    });
    branch.listOfVehicles = this.vehicles;
    this.rentSer.addNewBranch(branch, this.serviceId);
    this.branchForm.reset();
    this.vehicles = [];

    alert("Successfully created new Branch!");
  }

  vehicleControl(e)
  {
    (e as Vehicle).id = -1;
    this.vehicles.push(e);
    alert("Successfully created new vehicle!");
  }

  changed()
  {
    this.pressed = !this.pressed;
  }

  createNew()
  {
    this.toCreate = new Vehicle();
    this.toCreate.branchID = -2;
    this.toCreate.rentacarID = this.serviceId;
  }

  /*updateVehicleBranch(brc:Branch)
  {
    this.vehicles.forEach(ve => {
      ve.branchLocation = brc;
    });
  }*/

}
