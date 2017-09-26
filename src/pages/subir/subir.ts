import { SubirArchivoService } from './../../providers/subir-archivo-service/subir-archivo-service';
import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from 'ionic-angular';

// plugins
 import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IArchivoSubir } from "../../Interfaces/IArchivoSubir";

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  imgPreview = null;
  imgData = "";
  titulo: string= "";

  constructor( private viewCtrl: ViewController, 
              private camera: Camera,
              private toastCtrl: ToastController,
              private platform: Platform,
              private imagePicker: ImagePicker,
              private loadingCtrl: LoadingController,
              private caf: SubirArchivoService

            ) {
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  mostrarGaleria () {
    if(!this.platform.is('cordova')){
      this.showToast("Error: Estas en un navegador");
      return;
    }
    let options: ImagePickerOptions = {
      maximumImagesCount : 1,
      quality: 40,
      outputType : 1
    };
    this.imagePicker.getPictures(options).then((results) => {

      for (var img of results) 
      {
        this.imgPreview = 'data:image/jpeg;base64,' + img;
        this.imgData = img;
      }

    }, (err) => { 
      this.showToast(err);
      console.error ('Error: ' + err);
    });
  }

  mostrarCamara(){
    if(!this.platform.is('cordova')){
      this.showToast("Error: Estas en un navegador");
      return;
    }

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.imgData = imageData;
    }, (err) => {
      this.showToast(err);
      console.error ('Error: ' + err);
    });
  }

  showToast(msg:string){
    this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();

  }

  crear_post (){
    let archivo: IArchivoSubir = {
      titulo: this.titulo,
      img: this.imgData
    }

    let loader = this.loadingCtrl.create({
        content: "Publicando..."
      }     
    );
    loader.present();

    this.caf.cargarArchivo(archivo)
      .then(
        ()=> {
          loader.dismiss();
          this.cerrar();
        },
        (error)=> {
          loader.dismiss();
          this.showToast(
            "Error: " + JSON.stringify(error)
          );
        }
      );
  }
}   
