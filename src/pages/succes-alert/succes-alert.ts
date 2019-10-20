import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { IniciarLoginProvider } from '../../providers/iniciar-login/iniciar-login';
import { AgregarIdHijoProvider } from '../../providers/agregar-id-hijo/agregar-id-hijo';


@Component({
  selector: 'page-succes-alert',
  templateUrl: 'succes-alert.html',
})
export class SuccesAlertPage {

  public lottieConfig: Object;
  private anim: any;
  tipo:string;
  id_hijo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public renderer:Renderer, public viewCtrl:ViewController, public iniciarLogin: IniciarLoginProvider,
    public agregarIdHijo:AgregarIdHijoProvider) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup-success', true);
    this.tipo = this.navParams.get('tipo');
    this.id_hijo = this.navParams.get('id_hijo');
    this.lottieConfig = {
      path: 'https://assets5.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

    setTimeout(() => {
      this.viewCtrl.dismiss();
      if(this.tipo == 'login-success'){
        this.iniciarLogin.emiteChange({
          iniciar_login: true
        });
      }else if(this.tipo == 'registro_success'){
        this.iniciarLogin.emiteChange({
          iniciar_login: true
        });
      }else if(this.tipo == 'hijo_ingresado'){
        this.agregarIdHijo.emiteChange({
          id_hijo: this.id_hijo
        })
      }
    }, 1350);
  }

  handleAnimation(anim: any) {
    this.anim = anim;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccesAlertPage');
  }

}
