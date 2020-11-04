import { Component, OnInit } from '@angular/core';
import { RCSAdmin } from 'src/app/entities/users/users';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Chart } from 'node_modules/chart.js';
import { formatDate } from '@angular/common';
import { Location } from 'src/app/entities/location/location';

@Component({
  selector: 'app-rentacar-graph',
  templateUrl: './rentacar-graph.component.html',
  styleUrls: ['./rentacar-graph.component.css']
})
export class RentacarGraphComponent implements OnInit {

  dateString: string;
  daily: boolean;
  weekly: boolean;
  permonth: boolean;
  myChart: any;
   hours: Array<number> = new Array<number>();
  admin: RCSAdmin;
  rentacar: Rentacar;
  salesDaily: Array<number> = new Array<number>(24);
  salesWeekly: Array<number> = new Array<number>(7);
  salesMonthly: Array<number> = new Array<number>(12);

  constructor(public service: RentacarService) {
    this.admin = JSON.parse(localStorage.getItem("user"));
    this.rentacar = new Rentacar(-1, "", new Location("", "", "", 0, 0));
    for (let i = 0; i < 24; i++) {
      this.salesDaily[i] = 0;
    }

    for (let i = 0; i < 7; i++) {
      this.salesDaily[i] = 0;
    }

    // for(let i = 0; i < 4; i++) {
    //   this.ticketWeekly[i] = 0;
    // }

    for (let i = 0; i < 12; i++) {
      this.salesMonthly[i] = 0;
    }
  }

  ngOnInit(): void {
    this.service.findRentacarInBase(this.admin.serviceId).subscribe(
      (res) => {
        this.rentacar = res as Rentacar;

        this.daily = true;
        this.weekly = false;
        this.permonth = false;

        for (let i = 0; i < 24; i++) {
          this.hours.push(i);
        }

        this.drawCharts();
      });
  }

  drawCharts() {
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.hours,
        datasets: [{
          label: 'Cash',
          data: this.salesDaily,
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
          label: 'Cash',
          data: this.salesWeekly,
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
          label: 'Cash',
          data: this.salesMonthly,
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
      this.salesDaily[i] = 0;
    }
    this.myChart.config.data = this.salesDaily;
    var input = (<HTMLInputElement>document.getElementById("dayTxt")).value;
    this.service.salesGraph(1, this.rentacar.nameOfService, input, "revenue").subscribe(
      (res) => {
        this.salesDaily = res as Array<number>;
        this.drawCharts();
      }
    )

    
  }

  submitInput2() {
    for (let i = 0; i < 7; i++) {
      this.salesWeekly[i] = 0;
    }
    var input = (<HTMLInputElement>document.getElementById("weekTxt")).value;
    //console.log(input)
    var inputSplit1 = input.split('-');
    var year = inputSplit1[0];
    var inputSplit2 = input.split('W');
    var week = inputSplit2[1];
    var date = this.getDateOfISOWeek(week, year);
    var getDate = date.getDate();
    this.dateString = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + 
    date.getDate().toString();

    this.service.salesGraph(2, this.rentacar.nameOfService, input, "revenue").subscribe(
      (res) => {
        this.salesDaily = res as Array<number>;
        this.drawCharts();
      }
    )
  }

  submitInput3() {
    for (let i = 0; i < 12; i++) {
      this.salesMonthly[i] = 0;
    }
    var input = (<HTMLInputElement>document.getElementById("monthTxt")).value;
    var inputSplit = input.split('-');

    this.service.salesGraph(2, this.rentacar.nameOfService, input, "revenue").subscribe(
      (res) => {
        this.salesDaily = res as Array<number>;
        this.drawCharts();
      }
    )
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
