import { Component, OnInit } from '@angular/core';
import { Rentacar, RentacarSearch } from 'src/app/entities/rentacar/rentacar';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';

@Component({
  selector: 'app-carsdisplay',
  templateUrl: './carsdisplay.component.html',
  styleUrls: ['./carsdisplay.component.css']
})
export class CarsdisplayComponent implements OnInit {

  allCars: Array<Rentacar> = new Array<Rentacar>();

  constructor(private rentSer : RentacarService) {
    
        //this.allCars = JSON.parse(localStorage.getItem("rentacars"));
        

        
   }

  ngOnInit(): void {
    console.log("usao")
    this.rentSer.loadAllCars().subscribe(
      (res)=> {
        this.allCars = res as Array<Rentacar>;
      },
      err => {

      }
    )
  }

  acceptData(data: RentacarSearch)
  {
    this.rentSer.searchRentacars(data).subscribe(
      (res) => {
        this.allCars = res as Array<Rentacar>;
      },
      err => {

      }
    )
  }

}
