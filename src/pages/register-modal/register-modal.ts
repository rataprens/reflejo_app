import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { SuccesAlertPage } from '../succes-alert/succes-alert';
import { ErrorAlertPage } from '../error-alert/error-alert';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-register-modal',
  templateUrl: 'register-modal.html',
})
export class RegisterModalPage {
  
  nombre_usuario:string;
  apellido:string
  correo:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer:Renderer, 
              public viewCtrl:ViewController, public afAuth:AngularFireAuth, public modalCtrl:ModalController,
              public afDB:AngularFirestore) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-register-modal', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterModalPage');
  }

  onKeyDown(event){
    if (event.keyCode === 32 ) {
      return false;
    }
  }

  registrar(){
    console.log('Registrar', this.nombre_usuario);
    this.afAuth.auth.createUserWithEmailAndPassword(this.correo,this.password).then(data=>{
      console.log(data)
      this.afDB.collection('usuarios').doc(`${this.correo}`).set({
        nombre: this.nombre_usuario,
        apellido: this.apellido
      });
      this.viewCtrl.dismiss();
      this.modalCtrl.create(SuccesAlertPage, {tipo: 'registro_success'}).present();
    }).catch(err=>{
      console.log(err)
      this.modalCtrl.create(ErrorAlertPage).present();
    });
  }

}
