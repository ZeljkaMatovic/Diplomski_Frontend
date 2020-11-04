import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Flight, ReservationModel } from 'src/app/entities/airline/airline';

@Component({
  selector: 'app-flight-preview',
  templateUrl: './flight-preview.component.html',
  styleUrls: ['./flight-preview.component.css']
})
export class FlightPreviewComponent implements OnInit {

  id: number;
  flight: Flight;
  searchFlight: Flight; //  OVO PROMIJENITI POD HITNO!
  business: boolean;
  resModel: ReservationModel;

  constructor(private route: ActivatedRoute, public service: AirlineService) {
    route.params.subscribe(params => {this.id = params['id']; });
    // this.flight = service.findFlight(this.id);
    // this.searchFlight = JSON.parse(localStorage.getItem("searchFlight"));

    this.resModel = JSON.parse(localStorage.getItem("resModel"))
   }

  ngOnInit(): void {
    this.service.findFlight(Number(this.id)).subscribe(
      (res: any) => {
        this.flight = res as Flight;
      }
    );

    if(this.resModel.FlightClass == "Business") {
      this.business = true;
    }
    else {
      this.business = false;
    }
  }

}
