import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch, Rentacar, Vehicle } from 'src/app/entities/rentacar/rentacar'
import { RentacarService } from 'src/app/services/rentacar/rentacar.service'

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  userType: string;
  idService:Number;
  idBranch:Number;
  rentacar: Rentacar;
  branch: Branch;
  toModify: Vehicle;
  constructor(private route:ActivatedRoute, private rentSer: RentacarService) {
    route.params.subscribe(params => {this.idService = params['id']; });
    route.params.subscribe(params => {this.idBranch = params['bid']; });
    this.userType = JSON.parse(localStorage.getItem("userType"));
   }

  ngOnInit(): void {
    console.log(this.idService);
    console.log(this.idBranch);
    var rentacars = JSON.parse(localStorage.getItem("rentacars"));
    rentacars.forEach(val => {
      if(val.id == this.idService)
      {
        this.rentacar = val;
        val.branches.forEach(bra => {
          if(bra.id == this.idBranch)
          {
            this.branch = bra;
          }
        });
      }
    });
  }

  modify(id:number)
  {
    this.branch.listOfVehicles.forEach(v => {
      if(v.id == id)
      {
        this.toModify = v;
        //console.log(this.toModify);
        return;
      }
    });

    //this.child.show();
  }

  newVehicle(e){
    this.rentSer.addNewVehicle(e);
    this.rentSer.findBranch(this.branch.rentacarID, this.branch.id).subscribe(
      (res) => {
        this.branch = res as Branch;
        alert("Success!");
      }
    );
    
    
  }

  createNew()
  {
    
    this.toModify = new Vehicle();
    
    this.toModify.branchID = -2;
    this.toModify.rentacarID = this.branch.rentacarID;
    
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
  modifyVehicle(vehicle: Vehicle)
  {
    var index;
    this.branch.listOfVehicles.forEach((v, i) => {
      if(v.id == vehicle.id)
      {
        index = i;
        return;
      }
    });

    this.branch.listOfVehicles[index] = vehicle;

    this.rentSer.modifyVehicle(vehicle);
  }

  addVehicle(vehicle: Vehicle)
  {
    vehicle.branchID = this.branch.id;
    vehicle.id = -1;
    this.rentSer.addNewVehicle(vehicle);

  }
}
