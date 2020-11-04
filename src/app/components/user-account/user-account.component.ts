import { Component, OnInit } from '@angular/core';
import { User, RegisteredUser } from 'src/app/entities/users/users';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user;
  image;
  userChangeForm: FormGroup;
  passwordForm: FormGroup;
  imageFromBase: string;
  src;

  constructor(public service: LoginService, public http: HttpClient, public domSanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
    this.initForm();
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);

    $(document).ready(function () {
      $("#changePass").hide();
      $("#changeProfile").hide();
    });

      this.service.getImageFromBase(this.user.userName).subscribe(
        (res: any) => {
          this.imageFromBase = res.image;
          if(this.imageFromBase != "userAvatar.png") {
           this.src = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imageFromBase);
          }
          else {
            this.src = "../assets/" + this.imageFromBase;
          }
        },
        (error: any) => {
          JSON.parse(JSON.stringify(error));
          console.log(error);
        }
      );
    //}
  }

  getBase64(file) {
    let reader = new FileReader();
    var result;
    reader.onload = function() {
      //console.log(reader.result);
      result = reader.result;
    };
    console.log(reader.readAsDataURL(file));
    console.log(result);
  }

  openFile() {
    (<HTMLInputElement>document.getElementById("selectedFile")).click();
  }

   changeProfilePhoto(event) {  
    this.image = event.target.files[0];
    //console.log(btoa(this.image));
    let reader = new FileReader();
    var service = this.service;
    var user = this.user;
    reader.onload = function() {
      //console.log(reader.result);
      let imageString = reader.result.toString().split(',')[1];

      service.changePhoto(user.userName, imageString).subscribe(
        (res: any) => {
          console.log(res);
          window.location.reload();
        },
        (error: any) => {
          console.log(error)
        }
      );
    };
    console.log(reader.readAsDataURL(this.image));
    //console.log(result);
    //this.service.changePhoto(this.user.username, btoa(this.image)).subscribe();
  }

  public ping() {
    this.http.get('https://example.com/api/things')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  changePassword() {
    $(document).ready(function () {
      $("#allInfo").hide();
      $("#changeProfile").hide();
      $("#changePass").show();
    });
  }

  changeProfile() {
    $(document).ready(function () {
      $("#allInfo").hide();
      $("#changeProfile").show();
      $("#changePass").hide();
    });
  }

  showInfo() {
    $(document).ready(function () {
      $("#allInfo").show();
      $("#changePass").hide();
      $("#changeProfile").hide();
    });
  }

  private initForm() {
    this.userChangeForm = new FormGroup({
      //'username': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'name': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'lastname': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'city': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(50)]),
      'phone': new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
    });

    this.passwordForm = new FormGroup({
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      'password2': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    });
  }

  checkChanges() {
    this.service.modifyUser(this.userChangeForm.controls["name"].value,
    this.userChangeForm.controls["lastname"].value, this.userChangeForm.controls["email"].value,
    this.userChangeForm.controls["city"].value, this.userChangeForm.controls["phone"].value).subscribe(
      (res : any) => {
        this.user.name = this.userChangeForm.controls["name"].value;
        this.user.lastname =  this.userChangeForm.controls["lastname"].value;
        this.user.email = this.userChangeForm.controls["email"].value;
        this.user.city = this.userChangeForm.controls["city"].value;
        this.user.phone = this.userChangeForm.controls["phone"].value;
        localStorage.setItem("user", JSON.stringify(this.user));
        console.log(JSON.parse(localStorage.getItem("user")) as RegisteredUser);
      }
    )
    //this.userChangeForm.reset();
  }

  checkPassword() {
    if(this.passwordForm.controls['password'].value != "" && this.passwordForm.controls['password2'].value != ""
    && this.passwordForm.controls['password'].value == this.passwordForm.controls['password2'].value) {
      this.user.password = this.passwordForm.controls['password'].value;
    }
  }

}
