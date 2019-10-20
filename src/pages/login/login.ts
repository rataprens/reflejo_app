import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginModalPage } from '../login-modal/login-modal';
import { IniciarLoginProvider } from '../../providers/iniciar-login/iniciar-login';
import { RegisterModalPage } from '../register-modal/register-modal';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  @ViewChild(Slides) slides: Slides;
  public lottieConfig: Object;
  private anim: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public renderer:Renderer, public viewCtrl:ViewController, public afAuth:AngularFireAuth,
              public modaCtrl:ModalController, public iniciarLogin:IniciarLoginProvider) {
    this.lottieConfig = {
      path: 'https://assets3.lottiefiles.com/datafiles/XpFCWApEzLI29va/data.json',
      renderer: 'canvas',
      autoplay: false,
      loop: true

    };

    this.iniciarLogin.changeEmitted$.subscribe(data=>{
      console.log(data.iniciar_login);
      if(data.iniciar_login){
            console.log('Logear');
          this.slides.lockSwipes(false);
          this.slides.freeMode = true;
          this.slides.slideNext();
          this.slides.lockSwipes(true);
          this.slides.freeMode = false;
          this.anim.play();
          setTimeout(() => {
            this.navCtrl.setRoot(HomePage);
          }, 1900);
      }else{

      }
    })
  }
  
  handleAnimation(anim: any) {
    this.anim = anim;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  login(){
    this.modaCtrl.create(LoginModalPage).present();
  }

  registrate(){
    console.log('Registrate');
    this.modaCtrl.create(RegisterModalPage).present();
  }

}
