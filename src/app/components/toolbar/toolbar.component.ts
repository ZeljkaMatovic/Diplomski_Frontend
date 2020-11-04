import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { User, SystemAdmin, RegisteredUser, RCSAdmin, ARSAdmin} from 'src/app/entities/users/users';
import { ActivatedRoute } from '@angular/router';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import * as jwt_decode from "jwt-decode";
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loggedin = false;
  //userType:string = "";
  user:User;
  username: string;
  rentacarAdmin:RCSAdmin;
  arsAdmin: ARSAdmin;
  sysAdmin: SystemAdmin;
  tokenInfo: any;

  constructor(public service: LoginService) {
  }
  
  ngOnInit(): void {
    //localStorage.setItem("isloggedin", JSON.stringify(false));
    this.loggedin = JSON.parse(localStorage.getItem("isloggedin"));
    //localStorage.setItem("isloggedin", JSON.stringify(false));
    //this.loggedin = false;
    //this.userType = JSON.parse(localStorage.getItem("userType"));
    //localStorage.removeItem("user");
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user != null)
    {
      this.arsAdmin = JSON.parse(localStorage.getItem("user"));

      this.tokenInfo = this.service.getDecodedAccessToken(localStorage.getItem('token'));
      console.log(this.tokenInfo);
      
      if(this.tokenInfo.Roles == "rcsa")
      {
        this.rentacarAdmin = this.user as RCSAdmin;
      }

      this.username = this.user.userName;
      
      console.log(this.loggedin);
      //console.log(this.userType);
      $(document).ready(function() {
        $("#homeButton").click(function() {
          window.location.assign('home')
        });

        $("#findDreamButton").click(function() {
          window.location.assign('')
        })

      })
    
    }
    
  }
  logoffmock()
  {
    localStorage.setItem("isloggedin", JSON.stringify(false));
    this.loggedin = false;
    localStorage.setItem("userType", JSON.stringify(""));
    //console.log(this.loggedin);
    //document.location.reload();
  }

}
