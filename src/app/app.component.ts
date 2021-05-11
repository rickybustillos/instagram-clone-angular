import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Instagram Clone';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyBY8LMQJesuH5gIGKV-t0GRHC1H9GrZCBk",
      authDomain: "instagram-clone-b995d.firebaseapp.com",
      databaseURL: "https://instagram-clone-b995d-default-rtdb.firebaseio.com",
      projectId: "instagram-clone-b995d",
      storageBucket: "instagram-clone-b995d.appspot.com",
      messagingSenderId: "711092011805",
      appId: "1:711092011805:web:c6e55f6be058b9df8897f4"
    };
    firebase.initializeApp(firebaseConfig)
  }
}
