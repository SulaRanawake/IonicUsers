import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private NavCtrl: NavController,
    private authService: AuthenticationService
  ) {}

  logout() {
    this.authService.logoutUser()
    .then( res => {
      console.log(res);
    }, err => {
      console.log(err.message);
    })
  }

  

}
