import { Injectable } from '@angular/core';
import { DiscountGroup } from 'src/app/entities/discounts/discounts';
import { Airline } from 'src/app/entities/airline/airline';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { AirlineService } from '../airline/airline.service';
import { RentacarService } from '../rentacar/rentacar.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  //airlineDiscounts:Array<DiscountGroup> = [];
  //rentacarDiscounts: Array<DiscountGroup> = [];
  removeDiscount: string;

  constructor(private airSer: AirlineService, private rentSer: RentacarService) { 
    //var aird = new DiscountGroup("New user", 0, 0);
    //this.airlineDiscounts.push(aird);
    //this.rentacarDiscounts.push(aird);
  }

  // GetAirlineDiscounts(id:number):Array<DiscountGroup> 
  // {
  //   return this.airSer.findAirline(id).discountGroups;
  // }

  GetRentacarDiscounts(id: number):Array<DiscountGroup>
  {
    return this.rentSer.findRentacar(id).discountGroups;
  }

  
}

