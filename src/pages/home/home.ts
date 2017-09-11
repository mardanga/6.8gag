import { SubirPage } from './../subir/subir';
import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;
  constructor(private modalCrl: ModalController, private afDB: AngularFireDatabase) {
    this.posts = this.afDB.list('/posts');

  }

  postear() {
    let modal = this.modalCrl.create(SubirPage) ;
    modal.present();
    
  }

}
