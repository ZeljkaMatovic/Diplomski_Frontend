import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarSearch, Branch, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {
  isMulti: Boolean = false;
  @Output() data: EventEmitter<CarSearch>;
  searchForm: FormGroup;
  tovList: Array<string> = [];
  dateOT: Date;
  dateOR: Date;
  listOfBranches1: Array<Branch> = [];
  listOfBranches2: Array<Branch> = [];
  serviceId: number;
  branchId: number;

  constructor(private route:ActivatedRoute, private rentSer: RentacarService) {
    route.params.subscribe(params => {this.serviceId = params['id']; this.branchId = params['bid'] });
   }

  ngOnInit(): void {
    this.initForm();
    this.rentSer.findRentacarInBase(this.serviceId).subscribe(
      (res) => {
        var rent = res as Rentacar;
        if(this.branchId == undefined)
        {
          rent.branches.forEach(b => {
          this.listOfBranches1.push(b)
          this.listOfBranches2.push(b);
          });
        }
        else
        {
          rent.branches.forEach(b => {
            if(this.branchId == b.id)
            {
              this.listOfBranches1.push(b)
            }
            this.listOfBranches2.push(b);
          });
        }
        this.data = new EventEmitter<CarSearch>(); 
        this.tovList = ["Micro", "Sedan", "CUV", "SUV", "Roadster", "Pickup", "VAN", "Camper", "Coupe", "Minivan", "Hatchback", "Limousine"];
        this.dateOT = null;
        this.dateOR = null;
        this.searchForm.controls["cityot"].setValue(this.listOfBranches1[0].location.nameOfCity, {onlySelf: true});
        this.searchForm.controls["cityor"].setValue(this.listOfBranches2[0].location.nameOfCity, {onlySelf: true});
      },
      err => {

      }
    )
    
    
  }

  initForm()
  {
    this.searchForm = new FormGroup({
      "cityot" : new FormControl(null),
      "cityor" : new FormControl(null, [Validators.required]),
      "price" : new FormControl("", [Validators.min(0)]),
      "tov" : new FormControl(null),
      "nos" : new FormControl("", [Validators.required, Validators.min(1)])
    });
    this.searchForm.controls["tov"].setValue(this.tovList[0], {onlySelf: true});

    
  }

  startDate(e)
  {
    	this.dateOT = e;
  }

  endDate(e)
  {
    this.dateOR = e;
  }

  search()
  {
    var cs = new CarSearch(this.searchForm.controls["cityot"].value, this.searchForm.controls["cityor"].value, this.dateOR,
    this.dateOR, this.searchForm.controls["price"].value, this.searchForm.controls["tov"].value, this.searchForm.controls["nos"].value);
    console.log(cs);
    this.data.emit(cs);
  }

}
