import { IArchivoSubir } from './../../Interfaces/IArchivoSubir';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import { ToastController } from "ionic-angular";

@Injectable()
export class SubirArchivoService {

  private CARPETA = "img";
  private POST = "posts";

  imagenes: any[] = [];
  lastKey: string =null;

  constructor(private af: AngularFireDatabase, private toastCtrl: ToastController) {
   
  }

  cargarArchivo(archivo: IArchivoSubir){
    let promesa = new Promise ((resolve, reject) => {
        this.showToast('Inicio carga de imagen');
        let storage  = firebase.storage().ref();
        let nombreArchivo = new Date().valueOf();
        let ut: firebase.storage.UploadTask = storage.child(this.CARPETA +'/' + nombreArchivo).
          putString(archivo.archivo, 'base64', {contentType: 'image/jpeg'});
        
        ut.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot)=> {},//change
        (error)=> {
          this.showToast('Error: ' + JSON.stringify(error));
          console.error('Error: ' + JSON.stringify(error));
          reject(error);
        },//error
        ()=> {
          let url = ut.snapshot.downloadURL;
          this.showToast('Imagen subida');
          this.crearPost(archivo.titulo, url);
          resolve();
        } //complete
        );

    });

    return promesa;
  }

  crearPost(titulo:string, url: string)
  {
    let post: IArchivoSubir= {
      titulo: titulo,
      archivo: url
    }

    post.key$ = this.af.list('/' + post).push(post).key;
    this.imagenes.push(post);
  }


  showToast(msg:string){
    let tast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();
  }
}
