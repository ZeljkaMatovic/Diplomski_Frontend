import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { RentacarSearch } from 'src/app/entities/rentacar/rentacar';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rentacar-search',
  templateUrl: './rentacar-search.component.html',
  styleUrls: ['./rentacar-search.component.css']
})
export class RentacarSearchComponent implements OnInit{
  constructor() { }
  isMultiSelect: Boolean = true;
  @Output() EventEmitter = new EventEmitter<RentacarSearch>()
  startDate: Date = null;
  endDate: Date = null;
  form: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup( {
      "name" : new FormControl(""),
      "city" : new FormControl(""),
      "address" : new FormControl(""),
      "number" : new FormControl("")
    });
  }
  
  receiveMessage(event : Array<Date>)
  {
    this.startDate = event[0];
    this.endDate = event.length == 2 ? event[1] : null;
  }

  searchRentacar()
  {
    this.EventEmitter.emit(new RentacarSearch(this.form.controls["name"].value, this.form.controls["city"].value,
                            this.form.controls["address"].value, this.form.controls["number"].value, 
                            this.startDate != null ? this.startDate.toDateString() : null, 
                            this.endDate != null ? this.endDate.toDateString() : null));
  }



}

