import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';

@Component({
  selector: 'app-rate-rentacar',
  templateUrl: './rate-rentacar.component.html',
  styleUrls: ['./rate-rentacar.component.css']
})
export class RateRentacarComponent implements OnInit {
  @Output() values: EventEmitter<Array<number>>;
  rate: number;
  rate2: number;
  rated: boolean;
  rated2: boolean;
  constructor() { 
    this.values = new EventEmitter<Array<number>>();
    this.rated = false;
    this.rated2 = false;
  }

  ngOnInit(): void {
    
  }

  radioHandler(event: any) {
    this.rate = Number(event.target.value);
    console.log(this.rate)
    this.rated = true;
  }

  radioHandler2(event: any) {
    this.rate2 = Number(event.target.value);
    console.log(this.rate2)
    this.rated2 = true;
  }

  rateAll()
  {
    var arr = new Array<number>(this.rate, this.rate2);
    this.values.emit(arr);
  }

}
