import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/entities/users/users';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { LoginService } from 'src/app/services/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-allfriends',
  templateUrl: './allfriends.component.html',
  styleUrls: ['./allfriends.component.css']
})
export class AllfriendsComponent implements OnInit {

  user: RegisteredUser;
  friendsList: Array<RegisteredUser>;
  imageFromBase: string;
  currentUser: RegisteredUser = new RegisteredUser(null, null, null, null, null, null, null);

  constructor(public service: RegistrateService, public loginService: LoginService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.friendsList = this.user.friends;
    // console.log(this.user)
    // console.log(this.friendsList)

    this.service.getFriends(this.user.email).subscribe(
      (res: any) => {
        this.friendsList = res as Array<RegisteredUser>;
        this.friendsList.forEach(friend => {
          this.loginService.getImageFromBase(friend.userName).subscribe(
            (res: any) => {
              this.imageFromBase = res.image;
              if(this.imageFromBase != "userAvatar.png") {
               friend.src = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imageFromBase);
              }
              else {
                friend.src = "../assets/" + this.imageFromBase;
              }
            },
            (error: any) => {
              JSON.parse(JSON.stringify(error));
              console.log(error);
            }
          );
        });

        console.log(this.friendsList)
      }
    );

  }

  deleteFriend(event, friend)
  {
    // this.user.friends.forEach(item => {
    //   if(item.username == friend.username) {
    //     this.user.friends = this.user.friends.filter(item2 => item2 != item);
    //     localStorage.setItem("user", JSON.stringify(this.user));
        //window.location.reload();

        this.service.deleteFriend(this.user.email, friend.email).subscribe(
          (res: any) => {
            this.user.friends.forEach(item => {
                if(item.userName == friend.username) {
                  this.user.friends = this.user.friends.filter(item2 => item2 != item);
                  localStorage.setItem("user", JSON.stringify(this.user));
                  window.location.reload();
                }
              })
          }
        );

        var name = friend.userName;
        document.getElementById(name).hidden = true;
     // }
   // });
  }

  seeUserInfo(event, friend) {
    this.currentUser = friend;
    console.log(this.currentUser)
  }

}
