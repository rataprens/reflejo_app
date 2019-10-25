import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-error-alert',
  templateUrl: 'error-alert.html',
})
export class ErrorAlertPage {
  
  public lottieConfig: Object;
  private anim: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer:Renderer, public viewCtrl:ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-error', true);
    this.lottieConfig = {
      path: '/assets/json/error.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 1350);
  }

  handleAnimation(anim: any) {
    this.anim = anim;
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorAlertPage');
  }

}
