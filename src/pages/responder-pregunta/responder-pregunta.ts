import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'page-responder-pregunta',
  templateUrl: 'responder-pregunta.html',
})
export class ResponderPreguntaPage {
  respuesta:string;
  correo_usuario:string;
  id_hijo:string;
  pregunta:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer:Renderer, 
    public viewCtrl:ViewController, public afDB:AngularFirestore, public alertCtrl:AlertController) {
      this.correo_usuario = this.navParams.get('correo');
      this.id_hijo = this.navParams.get('id_hijo');
      this.pregunta = this.navParams.get('pregunta');
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-responder-modal', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResponderPreguntaPage');
  }

  responder(){
    console.log(this.respuesta);
    this.alertCtrl.create({
      title: 'Atención',
      message: '¿Está seguro con su respuesta?',
      buttons: [{
        text: 'Continuar',
        handler: ()=>{
          this.afDB.collection('usuarios').doc(`${this.correo_usuario}`).collection('Hijos').doc(`${this.id_hijo}`).collection('historial').add({
            fecha: Date.now(),
            pregunta: this.pregunta,
            respuesta: this.respuesta
          }).then(()=>{
            console.log('respuesta enviada con exito')
            this.viewCtrl.dismiss();
          });
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }]
    }).present();
  }

}
