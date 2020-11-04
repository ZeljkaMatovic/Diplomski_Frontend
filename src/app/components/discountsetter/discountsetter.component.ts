import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DiscountGroup } from 'src/app/entities/discounts/discounts';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service'
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { Airline } from 'src/app/entities/airline/airline';
@Component({
  selector: 'app-discountsetter',
  templateUrl: './discountsetter.component.html',
  styleUrls: ['./discountsetter.component.css']
})
export class DiscountsetterComponent implements OnInit{
  
  id: number;
  name: string;
  serviceType: string;
  serviceName: string;
  group: DiscountGroup;
  newGroup: DiscountGroup;
  discounts: Array<DiscountGroup>;
  groupForm: FormGroup;
  constructor(private route: ActivatedRoute, private discSer: DiscountService, private airSer: AirlineService, private rentSer: RentacarService) 
  { 
    route.params.subscribe(params => {this.id = params['id']; });
    route.params.subscribe(params => {this.serviceType = params['put']});
  }

  /*ngDoCheck()
  {
    var indexes = [];
    this.showedDiscounts.forEach((v,i) => {
      if(!this.discounts.includes(v))
      {
        indexes.push(i);
      }
    });

    indexes.forEach(i => {
      this.showedDiscounts.splice(i, 1);
    });
    
    this.discounts.forEach(v => {
      if(!this.showedDiscounts.includes(v))
      {
        if(v.groupName.toLowerCase().includes(this.name.toLowerCase()))
        {
          this.showedDiscounts.push(v);
        }
      }
      
    });
  }*/

  ngOnInit(): void {
    if(this.serviceType == 'airline')
    {
      this.airSer.findAirline(this.id).subscribe(
        (res) => {
          this.serviceName = (res as Airline).nameOfAirline;
          this.discounts = (res as Airline).discountGroups;
        },
        err => {

        }
      );
      this.newGroup = new DiscountGroup(-1, this.id, "", 0 , 0);
    }
    else 
    {
      this.rentSer.findRentacarInBase(this.id).subscribe(
        (res) => {
          this.serviceName = (res as Rentacar).nameOfService;
          this.discounts = (res as Rentacar).discountGroups;
        },
        err => {

        }
      );
      this.newGroup = new DiscountGroup(-1, this.id, "", 0 , 0);
    }

    this.group = this.newGroup;
    this.name = "";
    this.initForm();
  }

  initForm()
  {
    this.groupForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.pattern("[a-z A-Z]*")]),
      'points': new FormControl("", [Validators.required, Validators.pattern("[0-9]*")]),
      'percent': new FormControl("", [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("[0-9]*")])
    });
  }

  deleteGroup(group: DiscountGroup)
  {
    if(this.serviceType == "airline")
    {
      this.airSer.removeDiscountGroup(this.id, group).subscribe(
        (res) => {
          this.discounts = res as Array<DiscountGroup>;
        }
      )
      
    }
    else
    {
      this.rentSer.removeDiscountGroup(this.id, group).subscribe(
        (res) => {
          this.discounts = res as Array<DiscountGroup>;
        }
      );
    }
  }

  search()
  {
    this.rentSer.getDiscountGroupsByName(this.id, this.serviceType,this.name).subscribe(
      (res) => {
        this.discounts = res as Array<DiscountGroup>;
      },
      (err) => {}
    )
  }

  createNew(e: DiscountGroup)
  {
    if(this.group.groupName == "")
    {
      if(this.serviceType == "airline")
      {
        this.airSer.addDiscountGroup(this.id, e).subscribe(
          (res) => {
            console.log(res);
            this.discounts = res as Array<DiscountGroup>;
          }
        )
        //a.discountGroups.push(e);
        //this.airSer.updateDiscountGroups(a);
        this.newGroup = new DiscountGroup(-1, this.id, "", 0 , 0);
      }
      else
      {
        this.rentSer.addDiscountGroup(this.id, e).subscribe(
          (res) => {
            console.log(res);
            this.discounts = res as Array<DiscountGroup>;
          }
        )
        this.newGroup = new DiscountGroup(1, this.id, "", 0 , 0);
      }

      this.group = this.newGroup;
    }
    else
    {
      if(this.serviceType == "rentacar")
      {
       
        this.rentSer.updateDiscountGroup(this.id, e).subscribe(
          (res) => {
            this.discounts = res as Array<DiscountGroup>;
          }
        );
      }
      else
      {
        this.airSer.updateDiscountGroup(this.id, e).subscribe(
          (res) => {
            this.discounts = res as Array<DiscountGroup>;
          }
        )
      }
    }
  }

  modifySetter(e: DiscountGroup)
  {
    this.group = e;
  }

  createSetter()
  {
    this.group = this.newGroup;
  }

  

  

}
