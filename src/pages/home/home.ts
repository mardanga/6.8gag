import { SubirArchivoService } from './../../providers/subir-archivo-service/subir-archivo-service';
import { SubirPage } from './../subir/subir';
import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { IArchivoSubir } from "../../Interfaces/IArchivoSubir";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMasPost = true;

  //posts: FirebaseListObservable<any[]>;
  constructor(private modalCrl: ModalController, 
    //private afDB: AngularFireDatabase, 
    private subirSrv: SubirArchivoService,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing
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

  cargarMas(infiniteScroll){
    this.subirSrv.cargarImagenes()
    .then(
      (haymas:boolean)=> {
        this.hayMasPost = haymas;
        infiniteScroll.complete();
      }
    );

  }

  compartir(post: IArchivoSubir){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(post.titulo, post.img).then(() => {
      this.showToast("Compartido exitosamente!!!");
}).catch((error) => {
  this.showToast("Error al compartir:" + error);

});
  }
}
