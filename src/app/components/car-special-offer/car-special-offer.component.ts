import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';

@Component({
  selector: 'app-car-special-offer',
  templateUrl: './car-special-offer.component.html',
  styleUrls: ['./car-special-offer.component.css']
})
export class CarSpecialOfferComponent implements OnInit {

  @Input() vehicle: Vehicle;
  offerForm: FormGroup;
  startDate: Date;
  endDate: Date;
  constructor(private rentSer: RentacarService) { }

  ngOnInit(): void {
    if(this.vehicle == undefined)
    {
      this.vehicle = new Vehicle();
    }
    this.initForm();
    this.startDate = null;
    this.endDate = null;
  }

  initForm()
  {
    this.offerForm = new FormGroup({
      'percent': new FormControl(this.vehicle.specialDiscount, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern("[0-9]*")])
    });
  }

  reciveDates(e: Array<Date>)
  {
    this.startDate = e[0];
    this.endDate = e[1];
  }

  make()
  {
    var dates = [];
    var wrongDates = [];
    var everythingOk = true;
    for(var s = this.startDate; s <= this.endDate; s.setDate(s.getDate() + 1))
    {
      dates.push(new Date(s));
    }

    this.vehicle.datesTaken.forEach(d => {
      dates.forEach(v => {
        if(d.getMonth == v.getMonth() && d.getFullYear() == v.getFullYear() && d.getDate() == v.getDate())
        {
          everythingOk = false;
          wrongDates.push(d);
        }
      })
    });

    if(everythingOk)
    {
      this.vehicle.specialOfferDates = dates;
      this.vehicle.specialDiscount = this.offerForm.controls["percent"].value;
      this.rentSer.modifyVehicle(this.vehicle).subscribe(
        (res: any) =>
        {
          alert("Success");
        }
      );
    }
    else
    {
      var errorString = "";
      wrongDates.forEach(da => {
        errorString += da.getDate() + "." + da.getMonth() + "." + da.getYear() + ". ";
      });
      alert("Error! Selected dates taken: " + errorString);
    }
  }

  
}
