import { Input, Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Vehicle, Branch, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-car',
  templateUrl: './modify-car.component.html',
  styleUrls: ['./modify-car.component.css']
})
export class ModifyCarComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Output() newVehicle = new EventEmitter<Vehicle>();
  titleString : string = "";
  vehicleForm: FormGroup;
  tovList: Array<string>; 
  branchList: Array<Branch>;
  hideBranchSelector: Boolean = true;
  constructor(private rentSer: RentacarService) { 
    this.tovList = ["Micro", "Sedan", "CUV", "SUV", "Roadster", "Pickup", "VAN", "Camper", "Coupe", "Minivan", "Hatchback", "Limousine"];
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(this.vehicle !== undefined)
    {
      console.log(this.vehicle.rentacarID);
      this.rentSer.findRentacarInBase(this.vehicle.rentacarID).subscribe(
        (res) => {
          this.branchList = (res as Rentacar).branches;
          if(this.vehicle.branchID >= 0)
          {
            this.titleString = "Modify vehicle";
            this.setFormValues();
            this.hideBranchSelector = false;
          }
          else
          {
            if(this.vehicle.branchID == -1) // -1 ako branch postoji, a nije odabran, -2 ako branch nije jos napravljen
            {
              this.hideBranchSelector = false;
            }
            else
            {
              this.hideBranchSelector = true;
            }
            this.titleString = "Create new vehicle";
            this.vehicleForm.reset();
            this.vehicleForm.controls["tov"].setValue(this.tovList[0], {onlySelf: true});
            this.vehicleForm.controls["branch"].setValue(this.branchList[0], {onlySelf: true});
          }
        }
        );
      

      
    }
    
  }

  checkInvalid()
  {
    const controls = this.vehicleForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log(name);
        }
    }
  }
  
  ngOnInit(): void {
    this.initForm();
  }

  setFormValues()
  {
    var index;
    this.branchList.forEach((b, i) => {
      if(b.id == this.vehicle.branchID)
      {
        
        index = i;
        return;
      }
    });

    if(this.vehicleForm === undefined)
    {
      this.vehicleForm = new FormGroup({
        'name': new FormControl(this.vehicle.name, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
        'mark': new FormControl(this.vehicle.markOfVehicle , [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
        'model': new FormControl(this.vehicle.modelOfVehicle , [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
        'year': new FormControl(this.vehicle.yearMade , [Validators.required, Validators.pattern('[1-2][0-9]*')]),
        'nos': new FormControl(this.vehicle.numberOfSeats , [Validators.required, Validators.pattern('[0-9]*')]),
        'tov': new FormControl(this.vehicle.typeOfVehicle),
        'ppd': new FormControl(this.vehicle.pricePerDay, [Validators.required, Validators.pattern('[0-9]*')]),
        'branch': new FormControl(this.branchList[index]),
        'canberented': new FormControl(this.vehicle.canBeRented)
      });
    }
    else
    {
      this.vehicleForm.controls["name"].patchValue(this.vehicle.name);
      this.vehicleForm.controls["mark"].patchValue(this.vehicle.markOfVehicle);
      this.vehicleForm.controls["model"].patchValue(this.vehicle.modelOfVehicle);
      this.vehicleForm.controls["year"].patchValue(this.vehicle.yearMade);
      this.vehicleForm.controls["nos"].patchValue(this.vehicle.numberOfSeats);
      this.vehicleForm.controls["tov"].patchValue(this.vehicle.typeOfVehicle, {onlySelf: true});
      this.vehicleForm.controls["branch"].patchValue(this.branchList[index], {onlySelf: true});
      this.vehicleForm.controls["ppd"].patchValue(this.vehicle.pricePerDay);
      this.vehicleForm.controls["canberented"].patchValue(this.vehicle.canBeRented);
    }
    
    
  }

  initForm()
  {
    this.vehicleForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      'mark': new FormControl("" , [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      'model': new FormControl("" , [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      'year': new FormControl("" , [Validators.required, Validators.pattern('[1-2][0-9]*')]),
      'nos': new FormControl("" , [Validators.required, Validators.pattern('[0-9]*')]),
      'tov': new FormControl(null),
      'ppd': new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
      'branch': new FormControl(null),
      'canberented': new FormControl(null)
    });

    this.vehicleForm.controls["tov"].setValue(this.tovList[0], {onlySelf: true});
    
    
  }

  modify()
  {
    var newVehicle;
    if(this.titleString == "Modify vehicle")
    {
      newVehicle = new Vehicle(this.vehicle.id, this.vehicle.branchID, this.vehicle.rentacarID,
        this.vehicleForm.controls["name"].value, this.vehicleForm.controls["mark"].value, this.vehicleForm.controls["model"].value,
        this.vehicleForm.controls["year"].value, this.vehicleForm.controls["nos"].value, this.vehicleForm.controls["tov"].value,
        this.vehicleForm.controls["ppd"].value, this.vehicleForm.controls['canberented'].value);
      console.log(newVehicle);
    }
    else
    {
      if(this.vehicle.branchID == -1) // pravi novi i biram mu branch
      {
        newVehicle = new Vehicle(-1, (this.vehicleForm.controls["branch"].value as Branch).id, this.vehicle.rentacarID,
        this.vehicleForm.controls["name"].value, this.vehicleForm.controls["mark"].value, this.vehicleForm.controls["model"].value,
        this.vehicleForm.controls["year"].value, this.vehicleForm.controls["nos"].value, this.vehicleForm.controls["tov"].value,
        this.vehicleForm.controls["ppd"].value, this.vehicleForm.controls['canberented'].value);
      }
      else // pravim novi za branch koji tek kreiram ili sam u njegovim detaljima
      {
        newVehicle = new Vehicle(-1, this.vehicle.branchID, this.vehicle.rentacarID,
        this.vehicleForm.controls["name"].value, this.vehicleForm.controls["mark"].value, this.vehicleForm.controls["model"].value,
        this.vehicleForm.controls["year"].value, this.vehicleForm.controls["nos"].value, this.vehicleForm.controls["tov"].value,
        this.vehicleForm.controls["ppd"].value, this.vehicleForm.controls['canberented'].value);
      }
      
    }
    
    

    this.newVehicle.emit(newVehicle);
    if(this.titleString == "Create new vehicle")
    {
      this.vehicleForm.reset();
    }
  }

}
