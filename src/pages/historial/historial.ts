import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  correo_usuario:string;
  id_hijo:string;
  mostrar_mensaje:boolean = true;
  historiales:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB:AngularFirestore) {
    this.correo_usuario = this.navParams.get('correo');
    this.id_hijo = this.navParams.get('id_hijo');
    this.afDB.collection('usuarios').doc(`${this.correo_usuario}`).collection('Hijos').doc(`${this.id_hijo}`).collection('historial').valueChanges().subscribe((data:any)=>{
      console.log(data);
      if(data.length > 0){
        console.log('Si hay Datos: '+ data.length);
        this.historiales = data;
        this.mostrar_mensaje = false;
      }else{
        console.log('No hay datos: '+ data.length);
        this.mostrar_mensaje = true;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

}
