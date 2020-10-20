import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  userEmail: string;

  constructor(
    private NavCtrl: NavController,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.userDetails()
    .subscribe( res => {
      console.log("res", res);
      if(res){
        this.userEmail = res.email;
      } else {
        this.NavCtrl.navigateBack('');
      }

    } , err => {
      console.log(err.message);
    })
  }

  logout() {
    this.authService.logoutUser()
    .then( res => {
      console.log(res);
      this.NavCtrl.navigateBack('');
    }, err => {
      console.log(err.message);
    })
  }

}
