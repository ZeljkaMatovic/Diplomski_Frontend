import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssysadminGuard implements CanActivate, CanActivateChild {
  isloggedin:Boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isloggedin = JSON.parse(localStorage.getItem("isloggedin"));
      if(this.isloggedin && JSON.parse(localStorage.getItem("userType")) == "sa")
      {
        return true;
      }
      return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isloggedin = JSON.parse(localStorage.getItem("isloggedin"));
      if(this.isloggedin && JSON.parse(localStorage.getItem("userType")) == "sa")
      {
        return true;
      }

      return false;
    }
  
  
}
