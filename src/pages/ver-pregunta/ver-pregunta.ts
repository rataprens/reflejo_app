import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ver-pregunta',
  templateUrl: 'ver-pregunta.html',
})
export class VerPreguntaPage {

  pregunta:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer:Renderer, public viewCtrl:ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-pregunta-modal', true);
    this.pregunta = this.navParams.get('pregunta');
    console.log(this.pregunta)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerPreguntaPage');
  }

}
