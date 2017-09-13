import { SubirPage } from './../subir/subir';
import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;
  constructor(private modalCrl: ModalController, private afDB: AngularFireDatabase, private toastCtrl: ToastController,
) {
    this.posts = this.afDB.list('/posts');

  }

  postear() {
    let modal = this.modalCrl.create(SubirPage) ;
    modal.present();
    //this.showToast("modal");
  }

   showToast(msg:string){
    let tast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();
  }
}
