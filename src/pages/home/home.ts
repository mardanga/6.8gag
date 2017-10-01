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
    let modal = this.modalCrl.create(SubirPage);
    modal.present();
    //this.showToast("modal");
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();
  }

  cargarMas(infiniteScroll) {
    this.subirSrv.cargarImagenes()
      .then(
      (haymas: boolean) => {
        this.hayMasPost = haymas;
        infiniteScroll.complete();
      }
      );

  }

  compartir(post: IArchivoSubir) {
    this.convertToDataURLviaCanvas(post.img, "image/jpeg").then(urldeimagen => {
      let urlbase64 = String(urldeimagen);
      this.socialSharing.share("8gag sharing", post.titulo, urlbase64, null).then(() => {
        this.showToast("Compartido exitosamente!!!");
      }).catch((error) => {
        this.showToast("Error al compartir:" + error);
      });
    });

  }

  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url;
    });
  }
}
