import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate-airline',
  templateUrl: './rate-airline.component.html',
  styleUrls: ['./rate-airline.component.css']
})
export class RateAirlineComponent implements OnInit {
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
    this.rated = true;
  }

  radioHandler2(event: any) {
    this.rate2 = Number(event.target.value);
    this.rated2 = true;
  }

  rateAll()
  {
    var arr = new Array<number>(this.rate, this.rate2);
    this.values.emit(arr);
  }

}
