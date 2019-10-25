import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-recuperar-password',
  templateUrl: 'recuperar-password.html',
})
export class RecuperarPasswordPage {
  confirmacion_email:string;
  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer:Renderer, public viewCtrl:ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-responder-modal', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPasswordPage');
  }

  recuperarPassword(){
    
  }

}
