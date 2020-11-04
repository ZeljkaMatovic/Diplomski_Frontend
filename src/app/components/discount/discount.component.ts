import { Component, OnInit } from '@angular/core';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { Airline } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service'; 
import { Service } from 'src/app/entities/service/service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  rentServices: Array<Rentacar>;
  airServices: Array<Airline>;
  services: Array<Service>;
  name:string;
  constructor(private airSer: AirlineService, private rentSer: RentacarService) { 
    this.services = [];
  }

  ngOnInit(): void {
    this.airSer.loadAllAirlinesSub().subscribe(
      (res : any) =>
      {
        (res as Array<Airline>).forEach(a => {
          this.services.push(a);
        })
      },
      err => {}
    )

    this.rentSer.loadAllCarsWithDiscountGroups().subscribe(
      (res : any) => {
        console.log(res);
        (res as Array<Rentacar>).forEach(r => {
          this.services.push(r);
        })
      },
      err => {}
    )
  }

  search()
  {
    this.rentSer.getServicesByName(this.name).subscribe(
      (res : any) => {
        this.services = new Array<Service>();
        res.rentacars.forEach(r => 
          {
            this.services.push(r);
          })
        res.airlines.forEach(a => {
          this.services.push(a);
        })
      }
    )
    //console.log(found);
    //this.showedServices = found;

  }

}
