import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgregarHijosPage } from '../pages/agregar-hijos/agregar-hijos';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { LottieAnimationViewModule } from 'ng-lottie';
import { SuccesAlertPage } from '../pages/succes-alert/succes-alert';

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { LoginPage } from '../pages/login/login';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { IniciarLoginProvider } from '../providers/iniciar-login/iniciar-login';
import { ErrorAlertPage } from '../pages/error-alert/error-alert';
import { RegisterModalPage } from '../pages/register-modal/register-modal';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { HistorialPage } from '../pages/historial/historial';
import { CantidadHijosProvider } from '../providers/cantidad-hijos/cantidad-hijos';
import { CantidadPreguntasProvider } from '../providers/cantidad-preguntas/cantidad-preguntas';
import { AgregarIdHijoProvider } from '../providers/agregar-id-hijo/agregar-id-hijo';
import { VerPreguntaPage } from '../pages/ver-pregunta/ver-pregunta';
import { ResponderPreguntaPage } from '../pages/responder-pregunta/responder-pregunta';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
registerLocaleData(localeEs);

export const firebaseConfig = {
  apiKey: "AIzaSyDds1Q7mzo4rwDbKvMxt0_nyzNWMiKzjHk",
  authDomain: "espejo-b20ab.firebaseapp.com",
  databaseURL: "https://espejo-b20ab.firebaseio.com",
  projectId: "espejo-b20ab",
  storageBucket: "espejo-b20ab.appspot.com",
  messagingSenderId: "946121241958"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AgregarHijosPage,
    SuccesAlertPage,
    LoginPage,
    LoginModalPage,
    ErrorAlertPage,
    RegisterModalPage,
    PreguntasPage,
    HistorialPage,
    VerPreguntaPage,
    ResponderPreguntaPage,
    MiPerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    LottieAnimationViewModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AgregarHijosPage,
    SuccesAlertPage,
    LoginPage,
    LoginModalPage,
    ErrorAlertPage,
    RegisterModalPage,
    PreguntasPage,
    HistorialPage,
    VerPreguntaPage,
    ResponderPreguntaPage,
    MiPerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'es-Es'},
    IniciarLoginProvider,
    CantidadHijosProvider,
    CantidadPreguntasProvider,
    AgregarIdHijoProvider,
  ]
})
export class AppModule {}
