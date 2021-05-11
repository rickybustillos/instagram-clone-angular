import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.auth.logOut();
  }

}
