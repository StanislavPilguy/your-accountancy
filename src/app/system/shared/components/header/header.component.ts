import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {User} from "../../../../shared/models/user.model";
import {AuthService} from "../../../../shared/servise/auth.service";


@Component({
  selector: 'pips-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private date: Date = new Date();
  private user: User;

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
