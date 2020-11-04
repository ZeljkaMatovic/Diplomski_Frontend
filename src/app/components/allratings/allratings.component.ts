import { Component, OnInit } from '@angular/core';
import { ARSAdmin } from 'src/app/entities/users/users';
import { Airline, Flight } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-allratings',
  templateUrl: './allratings.component.html',
  styleUrls: ['./allratings.component.css']
})
export class AllratingsComponent implements OnInit {

  admin: ARSAdmin;
  airline: Airline;
  averageRate: number = 0;
  rateSum: number = 0;
  rateSumFlight: number = 0;

  constructor(public service: AirlineService) {
    this.admin = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {

    this.service.findAirline(this.admin.serviceId).subscribe(
      (res: any) => {
        console.log(res)
        this.airline = res as Airline;

        this.service.getAirlineAverageRate(this.airline.id).subscribe(
          (res: any) => {
            this.averageRate = res;
          }
        );

        console.log(this.airline)
        this.service.findAirlineFlights(this.airline.nameOfAirline).subscribe(
          (res: any) => {
            this.airline.listOfFlights = res as Array<Flight>;

            this.airline.listOfFlights.forEach(flight => {
              this.service.getFlightAverageRate(flight.id).subscribe(
                (res: any) => {
                  flight.averageRate = res;
                }
              );
            });

            console.log(this.airline.listOfFlights)
          }
        );
        // if (this.airline.allRatings.length != 0) {
        //   this.airline.allRatings.forEach(rate => {
        //     this.rateSum += rate;
        //   });

        //   this.averageRate = Math.round(this.rateSum / this.airline.allRatings.length);
        // }

        // this.airline.listOfFlights.forEach(flight => {
        //   if (flight.allRatings.length != 0) {
        //     flight.allRatings.forEach(rate => {
        //       this.rateSumFlight += rate;
        //     });

        //     flight.averageRate = Math.round(this.rateSumFlight / flight.allRatings.length);
        //     this.rateSumFlight = 0;
        //   }

        // });
      }
    );

  }

}
