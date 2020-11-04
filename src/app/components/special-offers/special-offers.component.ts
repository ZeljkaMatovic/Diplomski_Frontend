import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Vehicle } from 'src/app/entities/rentacar/rentacar';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit, OnChanges {
  @Input() vehicles: Array<Vehicle>;
  specialCars: Array<SpecialCar>;
  constructor() { }

  ngOnInit(): void {
    this.specialCars = [];
    this.vehicles.forEach(v => {
      if(v.specialOfferDates.length != 0)
      {
        var startDate = v.specialOfferDates[0];
        var sdString = startDate.getDate() + "." + startDate.getMonth() + "." + startDate.getFullYear() + ".";
        var endDate = v.specialOfferDates[v.specialOfferDates.length - 1];
        var edString = endDate.getDate() + "." + endDate.getMonth() + "." + endDate.getFullYear() + ".";
        this.specialCars.push(new SpecialCar(v.name, v.markOfVehicle, v.modelOfVehicle, v.yearMade, sdString, edString, v.specialDiscount));
      }
    });
    console.log(this.specialCars);
  }

  ngOnChanges(): void {
    this.specialCars = [];
    this.vehicles.forEach(v => {
      console.log(v.specialOfferDates);
      if(v.specialOfferDates.length != 0)
      {
        var startDate = v.specialOfferDates[0];
        var sdString = startDate.getDate() + "." + startDate.getMonth() + "." + startDate.getFullYear() + ".";
        var endDate = v.specialOfferDates[v.specialOfferDates.length - 1];
        var edString = endDate.getDate() + "." + endDate.getMonth() + "." + endDate.getFullYear() + ".";
        this.specialCars.push(new SpecialCar(v.name, v.markOfVehicle, v.modelOfVehicle, v.yearMade, sdString, edString, v.specialDiscount));
      }
    });
    console.log(this.specialCars);
  }

}

class SpecialCar {
  name:string;
  markOfVehicle: string;
  modelOfVehicle: string;
  yearMade: number;
  startDate: string;
  endDate: string;
  discount: number;

  constructor(name: string, mov: string, mlov: string, ym: number, sd: string, ed: string, dis: number)
  {
    this.name = name;
    this.markOfVehicle = mov;
    this.modelOfVehicle = mlov;
    this.yearMade = ym;
    this.startDate = sd;
    this.endDate = ed;
    this.discount = dis;
  }
}
