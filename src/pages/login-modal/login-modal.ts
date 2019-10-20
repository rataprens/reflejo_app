import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SuccesAlertPage } from '../succes-alert/succes-alert';
import { ErrorAlertPage } from '../error-alert/error-alert';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {

  @ViewChild(Slides) slides: Slides;
  correo:string;
  password:string;
  public lottieConfig: Object;
  private anim: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public renderer:Renderer, public viewCtrl:ViewController, public afAuth:AngularFireAuth, 
              public modalCtrl:ModalController, public afDB:AngularFirestore) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-login-modal', true);

    this.lottieConfig = {
      path: 'https://assets4.lottiefiles.com/temp/lf20_XgycDo.json',
      renderer: 'canvas',
      autoplay: true,
      loop: false
    };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }

  ingresar(){
    console.log('LOGEAR: '+ this.correo, this.password)
    if(this.correo && this.password){
      this.afAuth.auth.signInWithEmailAndPassword(this.correo, this.password).then(data=>{
        console.log(data);
        if(data.user){
          console.log('correcto');
          this.viewCtrl.dismiss();
          this.modalCtrl.create(SuccesAlertPage, {tipo: 'login-success'}).present();
        }
      }).catch(err=>{
        console.log(err)
        this.modalCtrl.create(ErrorAlertPage).present();
      })
    }else{
      this.modalCtrl.create(ErrorAlertPage).present();
    }
  }

  onKeyDown(event){
    if (event.keyCode === 32 ) {
      return false;
    }
  }

}
