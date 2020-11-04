import { Component, OnInit, Input } from '@angular/core';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { Service } from 'src/app/entities/service/service';
import { Airline } from 'src/app/entities/airline/airline';
import { DiscountGroup } from 'src/app/entities/discounts/discounts';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.css']
})
export class ServiceCardsComponent implements OnInit {
  @Input() service: Service;
  serviceId: number;
  serviceName: string;
  serviceType: string;
  groupCount: number;
  pictureString: string;
  discountGroups: Array<DiscountGroup>;
  linker: string;
  
  constructor() {
   }

  ngOnInit(): void {
    console.log(this.service);
    if((this.service as Rentacar).nameOfService != undefined)
    {
      var r = this.service as Rentacar;
      this.serviceName = r.nameOfService;
      this.serviceType = "Rent-a-Car";
      this.groupCount = r.discountGroups.length;
      this.serviceId = r.id;
      this.pictureString = r.image;
      this.discountGroups = r.discountGroups;
      this.linker = "rentacar";
    }
    else
    {
      var a = this.service as Airline;
      this.serviceName = a.nameOfAirline;
      this.serviceType = "Airline";
      this.groupCount = a.discountGroups.length;
      this.serviceId = a.id;
      this.pictureString = a.image;
      this.discountGroups = a.discountGroups;
      this.linker = "airline";
    }
  }

}
