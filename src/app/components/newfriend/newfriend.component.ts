import { Component, OnInit } from '@angular/core';
import { User, RegisteredUser } from 'src/app/entities/users/users';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { LoginService } from 'src/app/services/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-newfriend',
  templateUrl: './newfriend.component.html',
  styleUrls: ['./newfriend.component.css']
})
export class NewfriendComponent implements OnInit {

  user: RegisteredUser;
  allUsers: Array<User>;
  friendCounter: number = 0;
  imageFromBase: string;
  imageFromBase2: string;
  currentUser: RegisteredUser = new RegisteredUser(null, null, null, null, null, null, null);

  constructor(public service: RegistrateService, public loginService: LoginService, public domSanitizer: DomSanitizer) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    this.service.getAllUsers(this.user.email).subscribe(
      (res: any) => {
        this.allUsers = res as Array<User>;
        this.allUsers.forEach(user => {
          this.loginService.getImageFromBase(user.userName).subscribe(
            (res: any) => {
              this.imageFromBase = res.image;
              if(this.imageFromBase != "userAvatar.png") {
               user.src = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imageFromBase);
              }
              else {
                user.src = "../assets/" + this.imageFromBase;
              }
            },
            (error: any) => {
              JSON.parse(JSON.stringify(error));
              console.log(error);
            }
          );
        });

        this.service.getRequests(this.user.email).subscribe(
          (res: any) => {
            this.user.friendRequests = res as Array<RegisteredUser>;
            this.friendCounter = this.user.friendRequests.length;
            this.user.friendRequests.forEach(friend => {
              this.loginService.getImageFromBase(friend.userName).subscribe(
                (res: any) => {
                  this.imageFromBase2 = res.image;
                  if(this.imageFromBase2 != "userAvatar.png") {
                   friend.src = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imageFromBase2);
                  }
                  else {
                    friend.src = "../assets/" + this.imageFromBase2;
                  }
                },
                (error: any) => {
                  JSON.parse(JSON.stringify(error));
                  console.log(error);
                }
              );
            });
          }
        );
      }
    );
  }

  addFriend(event, user) {
    //this.user.friends.push(user);
    // user.friendRequests.push(this.user);
    // console.log(user.friendRequests);
    // localStorage.setItem("user", JSON.stringify(this.user));

    this.service.addFriend(this.user.email, user.email).subscribe(
      (res: any) => {

      }
    );

    var name = user.userName;
    document.getElementById(name).hidden = true;

  }

  acceptFriend(event, friend) {
    // this.user.friends.push(friend);
    // this.user.friendRequests = this.user.friendRequests.filter(item => item != friend);

    // localStorage.setItem("user", JSON.stringify(this.user));

    this.service.acceptFriend(friend.email, this.user.email).subscribe(
      (res: any) => {
        console.log(res)
      }
    );

    // var name = friend.userName;
    // document.getElementById(name).hidden = true;

    window.location.reload();
  }

  declineFriend(event, friend) {
    // this.user.friendRequests = this.user.friendRequests.filter(item => item != friend);

    // localStorage.setItem("user", JSON.stringify(this.user));

    this.service.declineFriend(friend.email, this.user.email).subscribe(
      (res: any) => {
        this.user.friendRequests = this.user.friendRequests.filter(item => item != friend);
      }
    );

    // var name = friend.userName;
    // document.getElementById(name).hidden = true;

    window.location.reload();
  }

  seeUserInfo(event, friend) {
    this.currentUser = friend;
  }

}
