import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Vehicle, CarSearch, Branch } from 'src/app/entities/rentacar/rentacar'
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { ModifyCarComponent } from '../modify-car/modify-car.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnChanges {
  @Input() serviceId: number;
  @Input() branchId: number;
  @Input() vehicles: Array<Vehicle>;
  @Input() userType: string;
  @Output() modifyId = new EventEmitter<number>();
  @Output() deleteVehicle = new EventEmitter<Vehicle>();
  shownVehicles: Array<Vehicle>;
  carSearch: CarSearch;
  toSpecial: Vehicle;
  toModify: Vehicle;
  toReserve: Vehicle;
  constructor(private rentSer: RentacarService) { 
    this.carSearch = null;
    this.toReserve = null;
  }

  ngOnChanges() : void {
    this.shownVehicles = this.vehicles;
  }

  ngOnInit(): void {
    this.toSpecial = this.vehicles[0];
    this.shownVehicles = this.vehicles;
    
  }

  delete(id:number)
  {
    var toDelete;
    this.vehicles.forEach(v => {
      if(v.id == id)
      {
        toDelete = v;
        return;
      }
    });
    this.deleteVehicle.emit(toDelete);
    //this.rentSer.deleteVehicle(toDelete).subscribe();
    
  }

  modify(id:number)
  {
    this.modifyId.emit(id);
  }

  special(vehicle : Vehicle)
  {
    this.toSpecial = vehicle;
  }

  getSearchData(data: CarSearch)
  {
    this.carSearch = data;
    this.shownVehicles = new Array<Vehicle>();

    this.rentSer.searchCars(data).subscribe(
      (res: any) => {
        this.shownVehicles = res as Array<Vehicle>;
      },
      err => {

      }
    )
    /*this.vehicles.forEach((v, i) => {
      var checkDates = true;
      var dates = this.rentSer.giveMeDates(data.dateOT, data.dateOR);
      dates.forEach(d => {
        if(v.datesTaken.includes(d))
        {
          checkDates = false;
          return;
        }
      });
      this.rentSer.findBranch(v.rentacarID, v.branchID).subscribe(
        (res) => {
          var rez = res as Branch;
          if(data.cityOT == rez.location.nameOfCity && checkDates)
          {
            this.shownVehicles.push(v);
          }
          else if(data.cityOT != rez.location.nameOfCity && checkDates)
          {
            var rentacar = this.rentSer.findRentacar(v.rentacarID);
            rentacar.carTransfers.forEach(t => {
              if(data.cityOT == rez.location.nameOfCity && t.dateOfTransfer <= data.dateOT)
              {
                this.shownVehicles.push(v);
              }
            });
          }
        }
      )
      
    });*/
    
  }

  reserve(car: Vehicle)
  {
    this.toReserve = car;
  }

}
