import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Logindata } from 'src/app/entities/logindata/logindata'
import { LoginService } from 'src/app/services/login/login.service'
import { Router, RouterLink } from '@angular/router'
import { Regdata } from 'src/app/entities/regdata/regdata';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { User, SystemAdmin, RegisteredUser, RCSAdmin, ARSAdmin, DiscountPoints } from 'src/app/entities/users/users';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

import { DOCUMENT } from '@angular/common';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';

import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { AppComponent } from 'src/app/app.component';
//import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  email = ""
  password = ""
  allUsers: Array<User>
  userFound: Boolean = false;
  username: string;

  chatSocket: WebSocket;

  constructor(private logService: LoginService, private router: Router, private OAuth: AuthService,
    private regService: RegistrateService, private toastr: ToastrService, private rentSer: RentacarService,
    @Inject(DOCUMENT) private document: Document, private airlineService: AirlineService, public appComponent: AppComponent) {
    this.allUsers = regService.mockedUsers();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      //this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this.logService.login(this.email, this.password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        //this.router.navigateByUrl('/home');
        //document.location.replace("/home/:");
        localStorage.setItem("isloggedin", JSON.stringify(true));
        var user;
        console.log(res);
        console.log(res.user.role);
        if (res.user.role == "ru") {
          user = new RegisteredUser(res.user.userName, "", res.user.name, res.user.lastname, res.user.email, res.user.city, res.user.phoneNumber);
          user.discountPoints = res.user.discountPoints != null ? res.user.discountPoints : new Array<DiscountPoints>();
          user.friends = res.user.friends != null ? res.user.friends : new Array<RegisteredUser>();
          user.friendRequests = res.user.friendsRequest != null ? res.user.friendsRequest : new Array<RegisteredUser>();
          user.reservedTickets = res.user.reservedTickets != null ? res.user.reservedTickets : new Array<Ticket>();
          user.ticketHistory = res.user.ticketHistory != null ? res.user.ticketHistory : new Array<Ticket>();
          user.reservedCars = res.user.reservedCars != null ? res.user.reservedCars : new Array<CarReservation>();
          user.reservedCarHistory = res.user.reservedCarsHistory != null ? res.user.reservedCarsHistory : new Array<CarReservation>();
          user.passportNumber = res.user.passportNumber != null ? res.user.passportNumber : "";

         
        }
        else if (res.user.role == "rcsa") {
          user = new RCSAdmin(res.user.userName, "password", res.user.name, res.user.lastname, res.user.email, "", "", res.user.rentacarID);
          this.rentSer.loadAllCars();
        }
        else if (res.user.role == "arsa") {
          user = new ARSAdmin(res.user.userName, "password", res.user.name, res.user.lastname, res.user.email, "", "", res.user.serviceID);
          this.airlineService.loadAllAirlines();

        }
        else if (res.user.role == "sys") {
          user = new SystemAdmin(res.user.userName, "password", res.user.name, res.user.lastname, res.user.email, "", "");
        }

        //this.appComponent.initChatSocket(res.user.userName);
        // this.appComponent.chatSocket.onmessage = (event) => {
        //   if (event.data == 'conAccepted') {
        //     alert('aaaaaaaaaaa');
        //     this.chatSocket.send('connConfUsername~' + res.user.userName);
        //   }
    
        // };

        this.loginmock(user);
      },
      (err: any) => {
        alert(err.error);
      }
    );
  }

  checkLogin() {
    this.email = (<HTMLInputElement>document.getElementById("logemail")).value;
    this.password = (<HTMLInputElement>document.getElementById("logpassword")).value;

    this.onSubmit();
  }

  emailChanged(e) {
    if (this.email.length === 0) {
      document.getElementById("logemail").classList.remove("error");
      document.getElementById("logemail").classList.remove("allGood");
    }
    else if (!this.logService.checkEmail(this.email)) {
      document.getElementById("logemail").classList.add("error");
      document.getElementById("logemail").classList.remove("allGood");
    }
    else {
      document.getElementById("logemail").classList.remove("error");
      document.getElementById("logemail").classList.add("allGood");
    }
  }

  loginmock(user: User) {
    console.log(user);
    if (user instanceof RegisteredUser) {
      localStorage.setItem("userType", JSON.stringify("ru"));
    }
    else if (user instanceof SystemAdmin) {
      localStorage.setItem("userType", JSON.stringify("sa"));
    }
    else if (user instanceof ARSAdmin) {
      localStorage.setItem("userType", JSON.stringify("arsa"));
    }
    else {
      localStorage.setItem("userType", JSON.stringify("rcsa"));
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isloggedin", JSON.stringify(true));
    document.location.replace("/home/:" + user.userName);
  }

  LoginWithGoogle() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {

      this.logService.externalLoginGoogle(socialusers).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        var user = new RegisteredUser(res.username, "", res.name, res.lastname, res.email, res.city, res.phone);
        user.discountPoints = res.discountPoints != null ? res.discountPoints : new Array<DiscountPoints>();
        user.friends = res.friends != null ? res.friends : new Array<RegisteredUser>();
        user.friendRequests = res.friendsRequest != null ? res.friendsRequest : new Array<RegisteredUser>();
        user.reservedTickets = res.reservedTickets != null ? res.reservedTickets : new Array<Ticket>();
        user.ticketHistory = res.ticketHistory != null ? res.ticketHistory : new Array<Ticket>();
        user.reservedCars = res.reservedCars != null ? res.reservedCars : new Array<CarReservation>();
        user.reservedCarHistory = res.reservedCarsHistory != null ? res.reservedCarsHistory : new Array<CarReservation>();
        user.passportNumber = res.passportNumber != null ? res.passportNumber : "";
        this.loginmock(user);
        //this.router.navigateByUrl('/home');
        //location.reload();
      });
    });

  }
}
