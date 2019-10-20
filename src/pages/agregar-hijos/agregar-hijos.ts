import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { SuccesAlertPage } from '../succes-alert/succes-alert';

@Component({
  selector: 'page-agregar-hijos',
  templateUrl: 'agregar-hijos.html',
})
export class AgregarHijosPage {

  nombre:string;
  apellido_paterno:string;
  apellido_materno:string;
  fecha_nacimiento:Date;
  genero:string;
  correo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public renderer:Renderer, public viewCtrl:ViewController,
              public afBD: AngularFirestore, public modalCtrl:ModalController) {

    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-hijos', true);
    this.correo = this.navParams.get('usuario');
    console.log(this.correo)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarHijosPage');
  }

  agregarHijo(){
    if(this.nombre && this.apellido_materno && this.apellido_paterno && this.fecha_nacimiento && this.genero ){
        console.log(this.nombre , this.apellido_materno , this.apellido_paterno , this.fecha_nacimiento , this.genero);
        this.afBD.collection('usuarios').doc(`${this.correo}`).collection('Hijos').add({
          Fecha_nacimiento: this.fecha_nacimiento,
          apellido_paterno: this.apellido_paterno,
          apellido_materno: this.apellido_materno,
          genero: this.genero,
          nombre: this.nombre,
          json: 'https://assets4.lottiefiles.com/packages/lf20_d1GoCb.json'
        }).then((docRef)=>{
          console.log('Usuario Creado Con Éxito con id '+ docRef.id);
          this.afBD.collection('usuarios').doc(`${this.correo}`).collection('Hijos').doc(`${docRef.id}`).update({
            id_hijo: docRef.id
          }).then(()=>{
            this.viewCtrl.dismiss();
            this.modalCtrl.create(SuccesAlertPage, {id_hijo: docRef.id, tipo: 'hijo_ingresado'}).present();
          });
        });

      }else{
        console.log('Un valor indefinido')
     }
  }

  onKeyDown(event){
    /* console.log('evento activado') */
    if (event.keyCode === 32 ) {
      return false;
    }
  }

}
