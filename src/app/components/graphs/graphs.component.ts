import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ARSAdmin } from 'src/app/entities/users/users';
import { Airline } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { formatDate } from '@angular/common';
import { Ticket } from 'src/app/entities/ticket/ticket';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  daily: boolean;
  weekly: boolean;
  permonth: boolean;
  myChart: any;
  hours: Array<number> = new Array<number>();
  admin: ARSAdmin;
  airline: Airline;
  ticketDaily: Array<number> = new Array<number>(24);
  ticketWeekly: Array<number> = new Array<number>(7);
  ticketMonthly: Array<number> = new Array<number>(12);
  allTickets: Array<Ticket>;
  dateString: string;

  constructor(public service: AirlineService) {
    this.admin = JSON.parse(localStorage.getItem("user"));
    

    for (let i = 0; i < 24; i++) {
      this.ticketDaily[i] = 0;
    }

    for (let i = 0; i < 7; i++) {
      this.ticketDaily[i] = 0;
    }

    // for(let i = 0; i < 4; i++) {
    //   this.ticketWeekly[i] = 0;
    // }

    for (let i = 0; i < 12; i++) {
      this.ticketMonthly[i] = 0;
    }
  }

  ngOnInit(): void {
    this.service.findAirline(this.admin.serviceId).subscribe(
      (res: any) => {
        console.log(res)
        this.airline = res as Airline;
        console.log(this.airline);
      });
    this.daily = true;
    this.weekly = false;
    this.permonth = false;

    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }

    this.drawCharts();

  }

  drawCharts() {
    console.log(this.ticketDaily)
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.hours,
        datasets: [{
          label: 'Number of tickets',
          data: this.ticketDaily,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
    });
    

    this.myChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Number of tickets',
          data: this.ticketWeekly,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.myChart = new Chart("myChart3", {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'Mart', 'April', 'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Number of tickets',
          data: this.ticketMonthly,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  checkSelect() {
    let input = (<HTMLInputElement>document.getElementById("chartType")).value;
    console.log(input);
    if (input == "daily") {
      this.daily = true;
      this.weekly = false;
      this.permonth = false;
    }
    else if (input == "weekly") {
      this.daily = false;
      this.weekly = true;
      this.permonth = false;
    }
    else if (input == "permonth") {
      this.daily = false;
      this.weekly = false;
      this.permonth = true;

    }
  }

  submitInput() {
    for (let i = 0; i < 24; i++) {
      this.ticketDaily[i] = 0;
    }
    this.myChart.config.data = this.ticketDaily;
    var input = (<HTMLInputElement>document.getElementById("dayTxt")).value;

    this.service.getTicketsByAirline(1, this.airline.nameOfAirline, input, "sales").subscribe(
      (res: any) => {
        this.ticketDaily = res as Array<number>;
        this.drawCharts()
      }
    );
  }

  submitInput2() {
    for (let i = 0; i < 7; i++) {
      this.ticketWeekly[i] = 0;
    }
    var input = (<HTMLInputElement>document.getElementById("weekTxt")).value;
    
    var inputSplit1 = input.split('-');
    var year = inputSplit1[0];
    var inputSplit2 = input.split('W');
    var week = inputSplit2[1];
    var date = this.getDateOfISOWeek(week, year);

    this.dateString = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + 
    date.getDate().toString();
    console.log(this.dateString);

    this.service.getTicketsByAirline(2, this.airline.nameOfAirline, this.dateString, "sales").subscribe(
      (res: any) => {
        this.ticketWeekly = res as Array<number>;
        this.drawCharts()
      }
    );

  }

  submitInput3() {
    for (let i = 0; i < 12; i++) {
      this.ticketMonthly[i] = 0;
    }
    var input = (<HTMLInputElement>document.getElementById("monthTxt")).value;
    var inputSplit = input.split('-');

    this.service.getTicketsByAirline(3, this.airline.nameOfAirline, inputSplit[1], "sales").subscribe(
      (res: any) => {
        this.ticketMonthly = res as Array<number>;
        this.drawCharts()
      }
    );

  }

  getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    return ISOweekStart;
  }

}