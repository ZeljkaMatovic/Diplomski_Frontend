import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { Regdata } from 'src/app/entities/regdata/regdata'
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public regService: RegistrateService, private toastr: ToastrService) { }
  regData: Regdata;
  check: string;
  name = ""
  lastname = ""
  email = ""
  password = ""
  rPassword = ""
  number = ""
  city = ""
  
  
  ngOnInit(): void {
    this.regService.formModel.reset();
  }

  onSubmit() {
    this.regService.register().subscribe(
      (res: any) => {
        console.log(res);
        if (res.succeeded) {
          this.regService.formModel.reset();
          alert('New user created!\nRegistration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        alert(err.error);
      }
    );
  }




  /// STARO

  registerUser() {  
    this.regData = new Regdata(this.email, this.password, this.rPassword, this.name, this.lastname, this.city, this.number);
    if(this.regService.validateRegistration(this.regData))
    {

    }
  }

  stringChanged(e)
  {
    this.check = e.target.value;
    if(this.check.length === 0)
    {
      document.getElementById(e.target.id).classList.remove("error");
      document.getElementById(e.target.id).classList.remove("allGood");
    }
    else if(!this.regService.checkString(this.check))
    {
      document.getElementById(e.target.id).classList.remove("allGood");
      document.getElementById(e.target.id).classList.add("error");
    }
    else
    {
      document.getElementById(e.target.id).classList.add("allGood");
      document.getElementById(e.target.id).classList.remove("error");
    }
  }

  emailChanged(e)
  {
    if(this.email.length === 0)
    {
      document.getElementById("email").classList.remove("error");
      document.getElementById("email").classList.remove("allGood");
    }
    else if(!this.regService.checkEmail(this.email))
    {
      document.getElementById("email").classList.remove("allGood");
      document.getElementById("email").classList.add("error");
    }
    else
    {
      document.getElementById("email").classList.remove("error");
      document.getElementById("email").classList.add("allGood");
    }
  }

  passwordChanged(e)
  {
    if(this.password.length === 0)
    {
      document.getElementById("password").classList.remove("error");
      document.getElementById("password").classList.remove("allGood");
    }
    else if(!this.regService.checkPassword(this.password))
    {
      document.getElementById("password").classList.remove("allGood");
      document.getElementById("password").classList.add("error");
    }
    else
    {
      document.getElementById("password").classList.remove("error");
      document.getElementById("password").classList.add("allGood");
    }
  }

  rpasswordChanged(e)
  {
    if(this.rPassword.length === 0)
    {
      document.getElementById("rpassword").classList.remove("error");
      document.getElementById("rpassword").classList.remove("allGood");
    }
    else if(!this.regService.checkBothPasswords(this.password, this.rPassword))
    {
      document.getElementById("rpassword").classList.remove("allGood");
      document.getElementById("rpassword").classList.add("error");
    }
    else
    {
      document.getElementById("rpassword").classList.remove("error");
      document.getElementById("rpassword").classList.add("allGood");
    }
  }

  rPhoneChanged(e)
  {
    if(this.number.length === 0)
    {
      document.getElementById("number").classList.remove("error");
      document.getElementById("number").classList.remove("allGood");
    }
    else if(!this.regService.checkIfNumber(this.number))
    {
      document.getElementById("number").classList.remove("allGood");
      document.getElementById("number").classList.add("error");
    }
    else
    {
      document.getElementById("number").classList.add("allGood");
      document.getElementById("number").classList.remove("error");
    }
  }
}
