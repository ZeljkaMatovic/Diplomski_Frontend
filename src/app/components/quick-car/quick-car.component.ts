import { Component, OnInit, Input } from '@angular/core';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Vehicle, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { RegisteredUser } from 'src/app/entities/users/users';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { AirlineService } from 'src/app/services/airline/airline.service';
//import { AnyARecord } from 'dns';

@Component({
  selector: 'app-quick-car',
  templateUrl: './quick-car.component.html',
  styleUrls: ['./quick-car.component.css']
})
export class QuickCarComponent implements OnInit {
  @Input() rentacar: Rentacar;
  vehicles: Array<Vehicle>;
  posReserv: Array<CarReservation>;
  user: RegisteredUser;
  roundAWays: RoundAWayPair = new RoundAWayPair("", new Date(), new Date());
  constructor(private rentSer: RentacarService, private airSer: AirlineService) { 
    this.user = JSON.parse(localStorage.getItem("user"));
    //console.log(this.roundAWays);
    this.posReserv = new Array<CarReservation>();
  }

  ngOnInit(): void {
    this.giveMeVehicles();
  }

  giveMeVehicles()
  {
    this.posReserv = new Array<CarReservation>();
    this.rentSer.findRoundAWayTrip().subscribe(
      (rez : any) => {
        if(rez.canDo)
        {
          this.roundAWays = new RoundAWayPair(rez.destination, new Date(rez.startDate), new Date(rez.endDate))
        this.rentSer.giveMeSpecialOfferCars(this.rentacar.id as Number, new Date(this.roundAWays.startDate), new Date(this.roundAWays.endDate), this.roundAWays.destination).subscribe(
          (res: any) => 
          {
            this.vehicles = new Array<Vehicle>();
    
            res.forEach((v,i) =>
            {
              var datesTaken = new Array<Date>();
              var datesSpecial = new Array<Date>();
    
              v.datesTaken.forEach(d => {
                datesTaken.push(d.dateTime);
              });
              v.specialOfferDates.forEach(d => {
                datesSpecial.push(d.dateTime);
              });
    
              this.vehicles.push(v);
              this.vehicles[i].datesTaken = datesTaken;
              this.vehicles[i].specialOfferDates = datesSpecial;
    
              var date = new Date(this.roundAWays.startDate);
              this.roundAWays.endDate = new Date(this.roundAWays.endDate);
              var counter = 0;
              for(var date = new Date(this.roundAWays.startDate); date <= this.roundAWays.endDate; date.setDate(date.getDate() + 1))
              {
                ++counter;
              }   
              
              this.vehicles.forEach((v, i) => {
                //vozilo, datum dolaska, datum odlaska, cijena sa popustom, totalna cijena sa popustom
                this.posReserv.push(new CarReservation(-1, this.user.userName, v, new Date(this.roundAWays.startDate), new Date(this.roundAWays.endDate),
                  v.pricePerDay * (100 - v.specialDiscount)/100, (counter * v.pricePerDay) * (100 - v.specialDiscount)/100, true));
              });
            },
            err => {
              alert(err.error);
            }
            )
          }
        );
        }
        
      }
    )
    
    
    
  }

  reserve(index: number)
  {
    var toReserve = this.posReserv[index] as CarReservation;
    this.rentSer.reserveCar(toReserve).subscribe(
      (res: any) => {
        alert("Success!");
      },
      err => {
        alert(err.error);
      }
    );
    
  }
}

class RoundAWayPair 
{
  destination: string;
  startDate: Date;
  endDate: Date;

  constructor(dest: string, sd: Date, ed: Date)
  {
    this.destination = dest;
    this.startDate = sd;
    this.endDate = ed;
  }
}

