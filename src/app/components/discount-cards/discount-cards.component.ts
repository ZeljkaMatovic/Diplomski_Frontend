import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { DiscountGroup } from 'src/app/entities/discounts/discounts';
import { ActivatedRoute } from '@angular/router';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { AirlineService } from 'src/app/services/airline/airline.service';



@Component({
  selector: 'app-discount-cards',
  templateUrl: './discount-cards.component.html',
  styleUrls: ['./discount-cards.component.css']
})
export class DiscountCardsComponent implements OnInit, DoCheck {
  @Input() discountGroup: DiscountGroup;
  @Output() group: EventEmitter<DiscountGroup> = new EventEmitter<DiscountGroup>();
  @Output() toDelete: EventEmitter<DiscountGroup> = new EventEmitter<DiscountGroup>();
  groupName: string;
  points: number;
  percentage: number;
  id: number;
  pathString: string;
  constructor(private route:ActivatedRoute, private rentSer: RentacarService, private airSer: AirlineService) { 
    route.params.subscribe(params => {this.id = params['id']; });
    route.params.subscribe(params => {this.pathString = params['put']; });
  }

  ngOnInit(): void {
    this.updateValues(this.discountGroup);
  }

  ngDoCheck()
  {
    this.updateValues(this.discountGroup);
  }

  updateValues(group: DiscountGroup)
  {
    this.groupName = group.groupName;
    this.points = group.minPoints;
    this.percentage = group.discountPercentage;
  }

  modify()
  {
    this.group.emit(this.discountGroup);
  }

  delete()
  {
    this.toDelete.emit(this.discountGroup);
  }

}
