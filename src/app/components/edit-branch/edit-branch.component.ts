import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Branch } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from 'src/app/entities/location/location';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';


@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  @Input() branch: Branch
  branchForm: FormGroup;
  @Output() modifiedBranch = new EventEmitter<Branch>();
  constructor(private rentSer: RentacarService) {
  }

  ngOnInit(): void {
    if(this.branch == undefined)
    {
      this.branch = new Branch(-1, -1, "", new Location("", "", "", 0, 0));
    }
    this.initForm();
  }

  initForm()
  {
    this.branchForm = new FormGroup({
      'name': new FormControl(this.branch.nameOfBranch, [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('[a-zA-Z][a-z A-Z0-9]*')]),
      'city': new FormControl(this.branch.location.nameOfCity, [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z][a-z A-Z]*')]),
      'address': new FormControl(this.branch.location.nameOfStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[a-z A-Z0-9]*')]),
      'number': new FormControl(this.branch.location.numberInStreet, [Validators.required, Validators.minLength(1), Validators.pattern('[0-9 ]+[a-zA-Z]?')])
    });
  }

  modify()
  {
    var br = new Branch(this.branch.id, this.branch.rentacarID, this.branchForm.controls["name"].value, 
    new Location(this.branchForm.controls["city"].value, this.branchForm.controls["address"].value, this.branchForm.controls["number"].value, 0, 0));
    this.modifiedBranch.emit(br); 
  }

}
