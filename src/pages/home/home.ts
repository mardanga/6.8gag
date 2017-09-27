import { SubirArchivoService } from './../../providers/subir-archivo-service/subir-archivo-service';
import { SubirPage } from './../subir/subir';
import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts = []; //FirebaseListObservable<any[]>;
  constructor(private modalCrl: ModalController, 
  //private afDB: AngularFireDatabase,
  private subirSrv: SubirArchivoService, 
  private toastCtrl: ToastController,
) {
    //this.posts = this.afDB.list('/posts');
    this.subirSrv.cargarImagenes();  
  }
  postear() {
    let modal = this.modalCrl.create(SubirPage) ;
    modal.present();
    //this.showToast("modal");
  }

   showToast(msg:string){
    this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();
  }
}
