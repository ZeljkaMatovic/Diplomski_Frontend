import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { Airline } from 'src/app/entities/airline/airline';
import { User, SystemAdmin, RCSAdmin, ARSAdmin} from 'src/app/entities/users/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AirlineService} from 'src/app/services/airline/airline.service';
import { RentacarService} from 'src/app/services/rentacar/rentacar.service';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';

@Component({
  selector: 'app-newadmin',
  templateUrl: './newadmin.component.html',
  styleUrls: ['./newadmin.component.css']
})
export class NewadminComponent implements OnInit {
  adminForm: FormGroup;
  path:string = "";
  rentacars: Array<Rentacar>;
  airlines: Array<Airline>;
  admin: User;
  constructor(private route: ActivatedRoute, private regSer: RegistrateService, private airSer: AirlineService, private rentSer: RentacarService) 
  {
    this.rentacars = JSON.parse(localStorage.getItem("rentacars"));
    this.airlines = JSON.parse(localStorage.getItem("airlines"));
    route.params.subscribe(params => {this.path = params['id']; });
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.adminForm = new FormGroup({
      'username': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      'name': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'lastname': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'city': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'phone': new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
    });

    if(this.path != "system")
    {
      
      this.adminForm.addControl('airSelect', new FormControl(null));
      this.adminForm.addControl('rentSelect', new FormControl(null));
      this.adminForm.controls["airSelect"].setValue(this.airlines[0].id, {onlySelf: true});
      this.adminForm.controls["rentSelect"].setValue(this.rentacars[0].id, {onlySelf: true});
    }
  }

  createNewAdmin()
  {
    
    if(this.path == "airline")
    {
      this.admin = new ARSAdmin(this.adminForm.controls["username"].value, this.adminForm.controls["password"].value, this.adminForm.controls["name"].value, this.adminForm.controls["lastname"].value, this.adminForm.controls["email"].value, this.adminForm.controls["city"].value, this.adminForm.controls["phone"].value, this.adminForm.controls["airSelect"].value);
    }
    else if(this.path == "rentacar")
    {
      this.admin = new RCSAdmin(this.adminForm.controls["username"].value, this.adminForm.controls["password"].value, this.adminForm.controls["name"].value, this.adminForm.controls["lastname"].value, this.adminForm.controls["email"].value, this.adminForm.controls["city"].value, this.adminForm.controls["phone"].value, this.adminForm.controls["airSelect"].value);
    }
    else
    {
      this.admin = new SystemAdmin(this.adminForm.controls["username"].value, this.adminForm.controls["password"].value, this.adminForm.controls["name"].value, this.adminForm.controls["lastname"].value, this.adminForm.controls["email"].value, this.adminForm.controls["city"].value, this.adminForm.controls["phone"].value);
    }

    this.regSer.addNewUser(this.admin).subscribe(
      (res: any) => {
        alert("Successfully created new admin!");
      },
      err => {
        alert(err);
      }
    );
    //console.log(this.regSer.mockedUsers());
    this.adminForm.reset();
  }

  validateRPassword(c: FormControl)
  {
    /*if(this.adminForm.value["password"] != c.value)
    {
      return null;
    }

    return;*/
  }

}


