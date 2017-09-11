import { PlaceholderPipe } from './../../pipes/placeholder/placeholder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;

  constructor( private viewCtrl: ViewController ) {
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
