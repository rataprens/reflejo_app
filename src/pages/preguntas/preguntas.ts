import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CantidadPreguntasProvider } from '../../providers/cantidad-preguntas/cantidad-preguntas';
import { VerPreguntaPage } from '../ver-pregunta/ver-pregunta';

@Component({
  selector: 'page-preguntas',
  templateUrl: 'preguntas.html',
})

export class PreguntasPage {

  preguntas:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB:AngularFirestore,
    public cantidadPreguntas:CantidadPreguntasProvider, public modalCtrl:ModalController) {

    this.afDB.collection('preguntas').valueChanges().subscribe(data=>{
      this.preguntas = data;
      console.log(this.preguntas);
      this.cantidadPreguntas.emiteChange({
        cantidad: data.length
      })
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntasPage');
  }

  abrirPregunta(pregunta:any){
    console.log(pregunta)
    this.modalCtrl.create(VerPreguntaPage, {pregunta: pregunta}).present();
  }

}
