import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Branch, CarSearch, Vehicle, BranchChange, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { RegisteredUser } from 'src/app/entities/users/users';

@Component({
  selector: 'app-reserve-car',
  templateUrl: './reserve-car.component.html',
  styleUrls: ['./reserve-car.component.css']
})
export class ReserveCarComponent implements OnInit, OnChanges {
  @Input() carSea: CarSearch;
  @Input() car: Vehicle; 
  titleString: string = "";
  serviceId: number;
  branchId: number;
  listOfBranches1: Array<Branch> = [];
  listOfBranches2: Array<Branch> = [];
  editable: boolean = true;
  totalPrice: number = 0;
  resForm: FormGroup;
  sDate: Date = null;
  eDate: Date = null;
  cssDate: Date = null;
  cseDate: Date = null;
  constructor(private route:ActivatedRoute, private rentSer: RentacarService, private regSer: RegistrateService) {
    this.carSea = null;
    
    route.params.subscribe(params => {this.serviceId = params['id']; this.branchId = params['bid'] })
    
    
   }

  ngOnInit(): void {
    if(this.car == null)
    {
      this.car = new Vehicle();
    }
    this.initForm();
    this.rentSer.findRentacarInBase(this.serviceId).subscribe(
      (res : any) => {
        var rent = res as Rentacar;
        if(this.branchId == undefined)
        {
          rent.branches.forEach(b => {
            this.listOfBranches1.push(b)
            this.listOfBranches2.push(b);
          });
        }
        else
        {
          rent.branches.forEach(b => {
            if(this.branchId == b.id)
            {
              this.listOfBranches1.push(b)
            }
            this.listOfBranches2.push(b);
          });
        }

        if(this.car == null)
        {
          this.car = new Vehicle(-1, -1, -1, "", "", "", 0, 0, "", 0, true );
        }
        this.resForm.controls["cityot"].setValue(this.listOfBranches1[0].location.nameOfCity, {onlySelf: true});
        this.resForm.controls["cityor"].setValue(this.listOfBranches2[0].location.nameOfCity, {onlySelf: true});
      }
    )
    
  }

  initForm()
  {
    this.resForm = new FormGroup({
      "cityot" : new FormControl(null),
      "cityor" : new FormControl(null, [Validators.required]),
    });

    
  }

  ngOnChanges(): void
  {
    if(this.carSea != null)
    {
      this.titleString = "Confirm";
      this.totalPrice = this.car.pricePerDay * this.rentSer.giveMeDates(this.carSea.dateOT, this.carSea.dateOR).length;
      this.sDate = this.carSea.dateOT;
      this.eDate = this.carSea.dateOR;
      this.totalPrice = 0;
    }
    else
    {
      this.titleString = "Create";
      this.sDate = null;
      this.eDate = null;
      this.totalPrice = 0;
    }
  }

  reserve()
  {
    var username = (JSON.parse(localStorage.getItem("user")) as RegisteredUser).userName;
    var newReservation = new CarReservation(-1, username, this.car, this.sDate , this.eDate,
    this.car.pricePerDay, this.totalPrice, false);
    this.rentSer.reserveCar(newReservation).subscribe(
      (res : any) => {
        alert("success");
      },
      err => {
        alert(err.error);
      }
    )
    
  }

  startDate(e)
  {
    this.sDate = e;
    if(this.eDate != null && this.sDate < this.eDate)
    {
      this.totalPrice = this.car.pricePerDay * this.rentSer.giveMeDates(this.sDate, this.eDate).length;
    }
  }

  endDate(e)
  {
    this.eDate = e;
    if(this.sDate != null && this.sDate < this.eDate)
    {
      console.log(this.rentSer.giveMeDates(this.sDate, this.eDate).length);
      this.totalPrice = this.car.pricePerDay * this.rentSer.giveMeDates(this.sDate, this.eDate).length;
    }
  }

}
