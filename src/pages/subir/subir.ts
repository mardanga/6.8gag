import { PlaceholderPipe } from './../../pipes/placeholder/placeholder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';

// plugins
// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  imgPreview = null;
  imgData = null;
  titulo: string;

  constructor( private viewCtrl: ViewController, 
              private camera: Camera,
              private toastCtrl: ToastController,
              private platform: Platform

            ) {
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  mostrarGaleria() {
    if(!this.platform.is('cordova')){
      this.showToast("Estas en un navegador");
      return;
    }
    // let options: ImagePickerOptions = {
    //   maximumImagesCount : 1,
    //   quality: 40,
    //   outputType : 1
    // };
    // this.imagePicker.getPictures(options).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }

  mostrarCamara(){
    if(!this.platform.is('cordova')){
      this.showToast("Estas en un navegador");
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
    let tast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: msg
    }).present();

  }

}   
