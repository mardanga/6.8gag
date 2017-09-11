import { SubirPage } from './../subir/subir';
import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private modalCrl: ModalController) {

  }

  postear() {
    let modal = this.modalCrl.create(SubirPage) ;
    modal.present();
    
  }

}
