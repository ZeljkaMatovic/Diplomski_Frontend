import { Component, OnInit, Output, EventEmitter, Input, OnChanges  } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnChanges {
  @Input() isMultiSelect:Boolean;
  @Input() selectedDate: Date = null;
  array: Array<Date>;
  hoveredDate: NgbDate | null = null;
  isChangeable: boolean = true;
  misDate: Date = new Date();
  minDate = {year: this.misDate.getFullYear(), month: this.misDate.getMonth() + 1, day: this.misDate.getDate()}
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if(this.selectedDate != null)
    {
      var date = new Date(this.selectedDate);
      this.fromDate.day = date.getDate();
      this.fromDate.month = date.getMonth() + 1;
      this.fromDate.year = date.getFullYear(); 
      this.isChangeable = false;
    }
    else
    {
      this.isChangeable = true;
    }
  }

  model: NgbDateStruct;

  @Output() messageEvent = new EventEmitter<Array<Date>>();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    //this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.array = [];
      this.fromDate = date;
      this.array.push(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day));
      this.messageEvent.emit(this.array);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.array = [];
      this.array.push(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day));
      this.array.push(new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day));
      this.messageEvent.emit(this.array);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.array = [];
      this.array.push(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day));
      this.messageEvent.emit(this.array);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onSelection(date: NgbDate)
  {
    this.array = [];
    this.array.push(new Date(this.model.year, this.model.month - 1, this.model.day));
    this.messageEvent.emit(this.array);
  }
}
