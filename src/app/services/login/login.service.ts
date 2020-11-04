import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { stringify } from 'querystring';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:40001/api';

  checkEmail(email:string) : boolean
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPassword(pass:string) : boolean
  {
    if(pass.length <= 0)
    {
      return false;
    }
    return true;
  }

  login(email: string, pass: string) {
    var loginBody =  {
      Email: email,
      Password: pass
    }
    return this.http.post(this.BaseURI + '/RegisteredUser/Login', loginBody);
  }

  externalLoginGoogle(formData)
  {
    return this.http.post(this.BaseURI + '/RegisteredUser/SocialLogin', formData);
  }

  modifyUser(name: string, lastname: string, email: string, city: string, phone: string)
  {
    var formData = {
      Name: name,
      Lastname: lastname,
      Email: email,
      City: city,
      PhoneNumber: phone
    }

    return this.http.post(this.BaseURI + "/User/ModifyUser", formData);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserProfile(token) {
    return this.http.get(this.BaseURI + '/User/GetUserProfile', token);
  }
  
  changePhoto(username: string, image: string) {
    var IdModel = {
      Name: username,
      Image: image
    }
    return this.http.post(this.BaseURI + "/User/Base64Encode", IdModel);
  }

  getImageFromBase(username: string) {
    var IdModel = {
      Name: username
    }
    return this.http.post(this.BaseURI + "/User/Base64Decode", IdModel);
  }


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
