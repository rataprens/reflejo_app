import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfilPage {

  public lottieConfig: Object;
  private anim: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
      path: 'https://assets8.lottiefiles.com/temp/lf20_USCruP.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiPerfilPage');
  }

  handleAnimation(anim: any) {
    this.anim = anim;
}

}
