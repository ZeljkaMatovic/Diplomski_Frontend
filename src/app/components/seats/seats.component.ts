import { Component, OnInit, ApplicationRef } from '@angular/core';
import { User } from 'src/app/entities/users/users';
import { Airline, ReservationModel } from 'src/app/entities/airline/airline';
import { Plane, Seat, BusRow, EcoRow } from 'src/app/entities/plane/plane';
import { AirlineService } from 'src/app/services/airline/airline.service';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  loggedin: boolean;
  user: User;
  airline: Airline;
  plane: Plane;
  seatID: string;
  seatId1: string;
  modify: boolean;
  idSeat: number;
  resModel: ReservationModel;
  sortedBusRows: Array<BusRow>;

  constructor(public service: AirlineService, public location: Location, private route: ActivatedRoute) {
    route.params.subscribe(params => {this.idSeat = Number(params['idSeat']); });
    //this.plane = this.airline.planes[0];
    this.resModel = JSON.parse(localStorage.getItem("resModel"));

    console.log(this.plane);
    this.modify = false;
  }

  ngOnInit(): void {
    this.service.findAirline(1).subscribe(
      (res: any) => {
        console.log(res)
        this.airline = res as Airline;

        this.service.findPlane(this.airline.id).subscribe(
          (res: any) => {
            this.plane = res as Plane;
            console.log(this.plane)

            this.service.getBusRows(this.plane.id).subscribe(
              (res: any) => {
                this.plane.businessRows = res as Array<BusRow>;
                this.plane.businessRows.sort((a, b) => a.idRow - b.idRow);
                this.plane.businessRows.forEach(busRow => {
                  this.service.getSeats(busRow.idRow).subscribe(
                    (res: any) => {
                      console.log(res);
                      if(res[0] != undefined) {
                        busRow.seat3 = res[0] as Seat;
                      }
                      else {
                        busRow.seat3 = new Seat();
                      }
                      if (res[1] != undefined) {
                        busRow.seat4 = res[1] as Seat;
                      }
                      else {
                        busRow.seat4 = new Seat();
                      }
                      if (res[2] != undefined) {
                        busRow.seat5 = res[2] as Seat;
                      }
                      else {
                        busRow.seat5 = new Seat();
                      }
                      if (res[3] != undefined) {
                        busRow.seat1 = res[3] as Seat;
                      }
                      else {
                        busRow.seat1 = new Seat();
                      }
                      if (res[4] != undefined) {
                        busRow.seat2 = res[4] as Seat;
                      }
                      else {
                        busRow.seat2 = new Seat();
                      }
                      if (res[5] != undefined) {
                        busRow.seat6 = res[5] as Seat;
                      }
                      else {
                        busRow.seat6 = new Seat();
                      }
                      if (res[6] != undefined) {
                        busRow.seat7 = res[6] as Seat;
                      }
                      else {
                        busRow.seat7 = new Seat();
                      }
                    }
                  );
                });

                this.service.getEcoRows(this.plane.id).subscribe(
                  (res: any) => {
                    this.plane.economyRows = res as Array<EcoRow>;
                    this.plane.economyRows.sort((a, b) => a.idRow - b.idRow);
                    this.plane.economyRows.forEach(ecoRow => {
                      this.service.getSeats(ecoRow.idRow).subscribe(
                        (res: any) => {
                          if(res[0] != undefined) {
                            ecoRow.seat4 = res[0] as Seat;
                          }
                          else {
                            ecoRow.seat4 = new Seat();
                          }
                          if (res[1] != undefined) {
                            ecoRow.seat1 = res[1] as Seat;
                          }
                          else {
                            ecoRow.seat1 = new Seat();
                          }
                          if (res[2] != undefined) {
                            ecoRow.seat2 = res[2] as Seat;
                          }
                          else {
                            ecoRow.seat2 = new Seat();
                          }
                          if (res[3] != undefined) {
                            ecoRow.seat3 = res[3] as Seat;
                          }
                          else {
                            ecoRow.seat3 = new Seat();
                          }
                          if (res[4] != undefined) {
                            ecoRow.seat5 = res[4] as Seat;
                          }
                          else {
                            ecoRow.seat5 = new Seat();
                          }
                          if (res[5] != undefined) {
                            ecoRow.seat6 = res[5] as Seat;
                          }
                          else {
                            ecoRow.seat6 = new Seat();
                          }
                          if (res[6] != undefined) {
                            ecoRow.seat7 = res[6] as Seat;
                          }
                          else {
                            ecoRow.seat7 = new Seat();
                          }
                        }
                      );
                    });
                  }
                );
              }
            );
          }
        );
      });

    this.loggedin = JSON.parse(localStorage.getItem("isloggedin"));
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    this.modify = false;
  }

  findSeatId(event, row, seat) {
    if (seat.class == "seat-white") { 
      if(this.user.role != "arsa") { 
        if(this.resModel.FlightClass == "Business") {
          (<HTMLInputElement>document.getElementById("seatId")).value = row.idRow + seat.idCol;
        }
      }
      else {
        (<HTMLInputElement>document.getElementById("seatId")).value = row.idRow + seat.idCol;
      }
    }
  }

  findEcoSeatId(event, row, seat) {
    if (seat.class == "seat-white") { 
      if(this.user.role != "arsa") { 
        if(this.resModel.FlightClass == "Economy") {
          (<HTMLInputElement>document.getElementById("seatId")).value = row.idRow + seat.idCol;
        }
      }
      else {
        (<HTMLInputElement>document.getElementById("seatId")).value = row.idRow + seat.idCol;
      }
    }
  }
 
  chooseSeat() {
    this.seatID = (<HTMLInputElement>document.getElementById("seatId")).value;
    localStorage.setItem("seatId" + Number(this.idSeat), JSON.stringify(this.seatID));

    if(this.idSeat == 1)
      window.close();
    else
      this.location.back();
  }

  changeModify() {
    this.modify = true;
  }

  modifyPlane() {
    this.plane.businessSeats = Number((<HTMLInputElement>document.getElementById("busNum")).value);
    this.plane.economySeats = Number((<HTMLInputElement>document.getElementById("ecoNum")).value);
    
    this.service.addNewSeats(this.plane.id, this.plane.economySeats, this.plane.businessSeats).subscribe(

    );
  }

  deleteSeat() {
    this.seatID = (<HTMLInputElement>document.getElementById("seatId")).value;
    this.service.deleteSeat(this.seatID).subscribe(
      (res: any) => {
        window.location.reload();
      },
      (err: any) => {
        alert("Seat cannot be deleted!");
      }
    );
  }

}
