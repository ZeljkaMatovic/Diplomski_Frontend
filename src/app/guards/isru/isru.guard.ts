import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsruGuard implements CanActivate {
  isloggedin: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isloggedin = JSON.parse(localStorage.getItem("isloggedin"));
      if(this.isloggedin && JSON.parse(localStorage.getItem("userType")) == "ru")
      {
        return true;
      }
      return false;
  }
  
}
