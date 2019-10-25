import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginPage } from '../pages/login/login';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { AngularFireAuth } from '@angular/fire/auth';
import { CantidadHijosProvider } from '../providers/cantidad-hijos/cantidad-hijos';
import { CantidadPreguntasProvider } from '../providers/cantidad-preguntas/cantidad-preguntas';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  cantidad_hijos:number;
  logo:string = "https://firebasestorage.googleapis.com/v0/b/espejo-b20ab.appspot.com/o/icono.png?alt=media&token=b6fe4a5e-2e50-48f3-acc6-b6d67a5d4b11";
  cantidad_preguntas:number;
  pages: Array<{title: string, component: any, icon:string , total?:number}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public afBD:AngularFirestore, public afAuth:AngularFireAuth,
    public cantidadHijos:CantidadHijosProvider, public cantidadPreguntas:CantidadPreguntasProvider,
    public afDB:AngularFirestore, public keyboard:Keyboard) {
    this.initializeApp();
      this.cantidadHijos.changeEmitted$.subscribe(data=>{
        console.log(data)
        this.cantidad_hijos = data.cantidad;
        this.pages[0].total = this.cantidad_hijos;
      });
      this.afDB.collection('preguntas').valueChanges().subscribe(data=>{
        this.cantidadPreguntas.emiteChange({
          cantidad: data.length
        })
      });
      this.cantidadPreguntas.changeEmitted$.subscribe(data=>{
        this.cantidad_preguntas = data.cantidad;
        this.pages[1].total = this.cantidad_preguntas;
      })
      console.log(this.afAuth.auth.currentUser);
      if(this.afAuth.auth.currentUser){
        console.log('Existe Usuario conectado')
      }else{
        console.log('No existe usuario conectado')
      }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mis Hijos', component: HomePage, icon:'fa-child'},
      { title: 'Preguntas', component: PreguntasPage, icon:'fa-question'},
      { title: 'Mi perfil', component: MiPerfilPage, icon:'fa-cog'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.keyboard.setResizeMode('ionic');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
