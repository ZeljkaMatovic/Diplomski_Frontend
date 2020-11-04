import { Component, OnInit } from '@angular/core';
import { Rentacar, Branch, Vehicle } from 'src/app/entities/rentacar/rentacar'
import { ActivatedRoute } from '@angular/router';
import { RentacarService} from 'src/app/services/rentacar/rentacar.service'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisteredUser } from 'src/app/entities/users/users';
import { Ticket } from 'src/app/entities/ticket/ticket';
import {Location } from 'src/app/entities/location/location'

@Component({
  selector: 'app-carprofile',
  templateUrl: './carprofile.component.html',
  styleUrls: ['./carprofile.component.css']
})
export class CarprofileComponent implements OnInit {

  id:number;
  selectedValue: Branch;
  allServices:Array<Rentacar>;
  serviceFound:Rentacar;
  pathString:string;
  userType:string;
  toModify: Vehicle;
  hasRoundWayTicket: boolean;
  readonly BaseURI = 'http://localhost:40000/api';
  constructor(private route:ActivatedRoute, private rentServ:RentacarService,  private http: HttpClient) {
    this.serviceFound = new Rentacar(-1, "", new Location("", "", "", 0, 0));
    route.params.subscribe(params => {this.id = params['id']; });
    route.params.subscribe(params => {this.pathString = params['put']; });
    this.hasRoundWayTicket = false;
    this.rentServ.findRentacarInBase(this.id).subscribe(
      (res : any) => {
        console.log(res);

        this.serviceFound = res as Rentacar;

        res.listOfVehicles.forEach((v,i) => {
          var dates = Array<Date>();
          v.specialOfferDates.forEach(d => {
            dates.push(new Date(d.dateTime));
          });
          this.serviceFound.listOfVehicles[i].specialOfferDates = dates;
        })
      }
    )
    if(this.serviceFound == undefined)
    {
      this.selectedValue = new Branch(-1, this.id, "", new Location("", "", "", 0 , 0));
    }
    else if(this.serviceFound.branches.length != 0)
    {
      this.selectedValue = this.serviceFound.branches[0];
    }
    this.userType = JSON.parse(localStorage.getItem("userType"));
    if(this.userType == "ru")
    {
      var user = JSON.parse(localStorage.getItem("user")) as RegisteredUser;
      if(user.reservedTickets.length >= 2)
      {
        var from = null as Ticket;
        var to = null as Ticket;
        
        user.reservedTickets.forEach((t, i) => {
          if(from == null)
          {
            from = t;
          }
          else
          {
            if(to == null)
            {
              to = t;
            }

            if(from.destinationFrom == to.destinationTo && from.destinationTo == to.destinationFrom)
            {
              this.hasRoundWayTicket = true;
              return;
            }
            else
            {
              from = to;
              to = null;
            }
          }
        });
      }
    }
    

   }

  ngOnInit(): void {
    this.rentServ.findRentacarInBase(this.id).subscribe(
      (res : any) => {
        this.serviceFound = res as Rentacar;
        res.listOfVehicles.forEach((v,i) => {
          var dates = Array<Date>();
          v.specialOfferDates.forEach(d => {
            dates.push(new Date(d.dateTime));
          });
          this.serviceFound.listOfVehicles[i].specialOfferDates = dates;
        })
        console.log(this.serviceFound);
      }
    )
    
  }

  newVehicle(e){
    e.branchID = -1;
    e.rentacarID = this.serviceFound.id;
    this.rentServ.addNewVehicle(e);
    this.serviceFound = this.rentServ.findRentacar(this.serviceFound.id);
    //console.log(this.serviceFound);
    alert("Success!");
  }

  createNew()
  {
    this.toModify = new Vehicle();
    this.toModify.branchID = -1;
    this.toModify.rentacarID = this.serviceFound.id;
    //console.log(this.toModify);
  }

  decision(e)
  {
    if((e as Vehicle).id == -1)
    {
      this.addVehicle(e);
    }
    else
    {
      this.modifyVehicle(e);
    }
  }
  
  modify(id:number)
  {
    this.serviceFound.listOfVehicles.forEach(v => {
      if(v.id == id)
      {
        this.toModify = v;
        //console.log(this.toModify);
        return;
      }
    });

    //this.child.show();
  }

  modifyVehicle(vehicle: Vehicle)
  {
    var index;
    this.serviceFound.listOfVehicles.forEach((v, i) => {
      if(v.id == vehicle.id)
      {
        index = i;
        return;
      }
    });

    this.serviceFound.listOfVehicles[index] = vehicle;

    this.rentServ.modifyVehicle(vehicle).subscribe(
      (res) => {
        this.rentServ.findRentacarInBase(this.serviceFound.id).subscribe(
          (res) => {
            console.log(res);
            this.serviceFound = res as Rentacar;
          },
          err => {
            alert(err);
          }
        )
      },
      err=> { alert(err)}
    )

  }

  addVehicle(vehicle: Vehicle)
  {
    this.rentServ.addNewVehicle(vehicle).subscribe(
      (res: any) => {
        this.rentServ.findRentacarInBase(vehicle.rentacarID).subscribe(
          (res) => {
            this.serviceFound = res as Rentacar;
          }
        )
        alert("success");
      },
      err => {
        alert("Vehicle add failed!")
      }
    );
  }

  deleteVehicle(veh: Vehicle)
  {
    this.rentServ.deleteVehicle(veh).subscribe(
      (res) => {
        this.rentServ.findRentacarInBase(veh.rentacarID).subscribe(
          (rez) => {
            this.serviceFound = rez as Rentacar;
          }
        )
    }
    )
  }

}
