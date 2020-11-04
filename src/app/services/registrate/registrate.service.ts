import { Injectable } from '@angular/core';
import { Regdata } from 'src/app/entities/regdata/regdata'
import { User, SystemAdmin, RegisteredUser, RCSAdmin, ARSAdmin, DiscountPoints} from 'src/app/entities/users/users';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { Seat } from 'src/app/entities/plane/plane';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { Vehicle, Rentacar } from 'src/app/entities/rentacar/rentacar';
import { RentacarService } from '../rentacar/rentacar.service';
import { Service } from 'src/app/entities/service/service';
import { Airline } from 'src/app/entities/airline/airline';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegistrateService {
  allUsers: Array<User>;
  readonly BaseURI = 'http://localhost:40001/api';
  constructor(private rentSer: RentacarService, private fb: FormBuilder, private http: HttpClient) { 
  }

  /// novo 
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Name: [''],
    Lastname: [''],
    PhoneNumber: [''],
    Passport: [''],
    City: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Name: this.formModel.value.Name,
      Lastname: this.formModel.value.Lastname,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Passwords.Password,
      Passport: this.formModel.value.Passport,
      City: this.formModel.value.City
    };
    return this.http.post(this.BaseURI + '/RegisteredUser/Register', body);
  }

  
  getAllUsers(email: string) {
    var IdModel = {
      Email: email
    }
    return this.http.post(this.BaseURI + '/User/GetAllUsers', IdModel);
  }

  getRequests(email: string) {
    var IdModel = {
      Email: email
    }
    return this.http.post(this.BaseURI + '/User/GetRequests', IdModel);
  }

  addFriend(email: string, email2: string) {
    var IdModel = {
      Email: email,
      Email2: email2
    }
    return this.http.post(this.BaseURI + '/User/AddFriend', IdModel);
  }

  acceptFriend(email: string, email2: string) {
    var IdModel = {
      Email: email,
      Email2: email2
    }
    return this.http.post(this.BaseURI + '/User/AcceptFriend', IdModel);
  }

  declineFriend(email: string, email2: string) {
    var IdModel = {
      Email: email,
      Email2: email2
    }
    return this.http.post(this.BaseURI + '/User/DeclineFriend', IdModel);
  }

  getFriends(email: string) {
    var IdModel = {
      Email: email
    }
    return this.http.post(this.BaseURI + '/User/GetFriends', IdModel);
  }

  deleteFriend(email: string, email2: string) {
    var IdModel = {
      Email: email,
      Email2: email2
    }
    return this.http.post(this.BaseURI + '/User/DeleteFriend', IdModel);
  }










  ///// STAROOOOOO

  //formula za dobijanje poena: (ukupnaCijena/1000) * 133
  //formula za gubljenje poena: (ukupnaCijena/1000) * 133 * 4 

  reserveCar(user: RegisteredUser, carRes: CarReservation, serv: Rentacar)
  {
    /*this.rentSer.(carRes).subscribe(
      (res) => {

      },
      err => {
        alert(err.error);
      }
    )*/
    /*this.allUsers.forEach(u => {
      if(u.username == user.username)
      {
        carRes.id = this.findNextIdCarReservation(user);
        (u as RegisteredUser).reservedCars.push(carRes);
        this.rentSer.updateTakenDates(carRes.vehicle, carRes.startDate, carRes.endDate);
        this.updateUserPoints(serv, true, user.username, carRes.totalPrice);
        if(carRes.specialOffer)
        {
          this.rentSer.updateSpecialOffer(carRes.vehicle, carRes.startDate, carRes.endDate);
        }   
        localStorage.setItem("user", JSON.stringify(u))
        return;
      }
    });*/
  }

  updateCarReservation(carRes: CarReservation)
  {
    var index = 0;
    this.allUsers.forEach(u => {
      if(carRes.user == u.userName)
      {
        (u as RegisteredUser).reservedCars.forEach((c, i) => {
          if(c.id == carRes.id)
          {
            index = i;
            return;
          }
        });
        (u as RegisteredUser).reservedCars[index] = carRes; 
      }
    });
  }

  cancelCarReservation(user: RegisteredUser, carRes: CarReservation)
  {
    var service = this.rentSer.findRentacar(carRes.vehicle.rentacarID);
    var index = 0;
    this.allUsers.forEach(u => {
      if(u.userName == user.userName)
      {
        user.reservedCars.forEach((v, i) => {
          if(v.id == carRes.id)
          {
            index = i;
            return;
          }
        });

        user.reservedCars.splice(index, 1);
      }
    });

    this.updateUserPoints(service, false, user.userName, carRes.totalPrice);
  }

  findNextIdCarReservation(user: RegisteredUser) : number
  {
    var counter = 0;
    var found = false;

    while(true)
    {
      user.reservedCarHistory.forEach(v => {
        if(counter == v.id)
        {
          found = true;
        }
      });

      user.reservedCars.forEach(v => {
        if(counter == v.id)
        {
          found = true;
        }
      });

      if(!found)
      {
        return counter;
      }
      else
      {
        found = false;
        ++counter;
      }
    }
  }

  //plus == false gubi poene, plus == true dobija poene
  updateUserPoints(serv: Service, plus: boolean, username: string, totalPrice: number)
  {
    var serType = "";
    var id = -1;
    if(serv instanceof Rentacar)
    { 
      serType = "rentacar";
      id = (serv as Rentacar).id;
    }
    else
    {
      serType = "airline";
      id = (serv as Airline).id;
    }

    this.allUsers.forEach(u => {
      if(u.userName == username)
      {
        var found = false;
        (u as RegisteredUser).discountPoints.forEach(d => {
          if(serType == d.serviceType && id == d.serviceId)
          {
            found = true;
            if(plus)
            {
              d.points += (totalPrice/1000) * 133;
            }
            else
            {
              d.points -= (totalPrice/1000) * 133 * 4;
            }
            return;
          }
        });
        if(!found)
        {
          (u as RegisteredUser).discountPoints.push(new DiscountPoints(id, serType, (totalPrice/1000) * 100))
        }
      }
    });

    
    
  }

  validateRegistration(registration: Regdata): boolean {
    if(!this.checkEmail(registration.email))
    {
      alert("Invalid e-mail!");
      return false;
    }

    if(!this.checkPassword(registration.password))
    {
      alert("Password must contain at least 8 letters/digits");
      return false;
    }
    else if(!this.checkBothPasswords(registration.password, registration.rPassword))
    {
      alert("Passwords don't match!");
      return false;
    }

    if(!this.checkString(registration.name))
    {
      alert("Name field must not be empty!");
      return false;
    }

    if(!this.checkString(registration.lastname))
    {
      alert("Last name field must not be empty!");
      return false;
    }

    if(!this.checkString(registration.city))
    {
      alert("City field must not be empty!");
      return false;
    }

    if(!this.checkIfNumber(registration.phone))
    {
      alert("You must enter a number for phone number!");
      return false;
    }

    return true;
  }

  checkEmail(email:string) : boolean
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPassword(pass:string) : boolean
  {
    if(pass.length <= 7)
    {
      return false;
    }
    return true;
  }

  checkBothPasswords(pass1: string, pass2: string) : boolean
  {
    if(pass1 !== pass2)
    {
      return false;
    }

    return true;
  }

  checkString(str: string) : boolean
  {
    if(str.length < 1)
    {
      return false;
    }

    return true;
  }

  checkIfNumber(str: string) : boolean 
  {
    if(isNaN(Number(str)))
    {
      return false;
    }

    return true;
  }

  mockedUsers() : Array<User> {
    

    return this.allUsers;
  }

  registeredUsersOnly(): Array<User> {
    let registeredOnly = new Array<User>();
    let allUsers = new Array<User>();

    allUsers = this.mockedUsers();
    allUsers.forEach(user => {
      if(user.role == 'user') {
        registeredOnly.push(user);
      }
    });

    return registeredOnly;
  }

  addNewUser(user: User)
  {
    var formData = {
      UserName: user.userName,
      Email: user.email,
      Password: user.password,
      Name: user.name,
      Lastname: user.lastname,
      Role: user.role,
      City: user.city,
      Phone: user.phoneNumber,
      RentacarID: null,
      ServiceID: null
    }
    if(user.role == "rcsa")
    {
      formData.RentacarID = (user as RCSAdmin).serviceId;
    }
    else if(user.role == "arsa")
    {
      formData.ServiceID = (user as ARSAdmin).serviceId;
    }
    
    console.log(formData);
    
    //this.allUsers.push(user);
    return this.http.post(this.BaseURI + "/SystemAdmin/NewAdmin", formData);
  }
}
