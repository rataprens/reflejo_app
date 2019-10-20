import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarHijosPage } from '../agregar-hijos/agregar-hijos';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { CantidadHijosProvider } from '../../providers/cantidad-hijos/cantidad-hijos';
import { HistorialPage } from '../historial/historial';
import { AgregarIdHijoProvider } from '../../providers/agregar-id-hijo/agregar-id-hijo';
import { ResponderPreguntaPage } from '../responder-pregunta/responder-pregunta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  correo:string;
  hijos:any = [];
  genero_hijo:string;
  public lottieConfig: Object;
  private anim: any;
  mostrar_mensaje:boolean;
  preguntas:any = [];
  pregunta_random:any;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public afDB:AngularFirestore, public modalCtrl:ModalController
    , public afAuth:AngularFireAuth, public cantidadHijos:CantidadHijosProvider, public agregarIdHijo:AgregarIdHijoProvider) {
      this.getPreguntas();
      this.afAuth.authState.subscribe(user=>{
      console.log(user.email);
      this.correo = user.email;
      this.getHijos();
    });
    
  /*   this.agregarIdHijo.changeEmitted$.subscribe(data=>{
      console.log(data.id_hijo);
      this.getHijos(data.id_hijo);
    }) */

  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  getPreguntas(){
    this.afDB.collection('preguntas').valueChanges().subscribe((preguntas)=>{
      this.preguntas = preguntas;
      console.log(preguntas)
      this.pregunta_random = this.preguntas[Math.floor(Math.random() * this.preguntas.length)];
      console.log(this.pregunta_random.pregunta);
    });
  }

  getHijos(){

    this.afDB.collection('usuarios').doc(`${this.correo}`).collection('Hijos').valueChanges().subscribe(data=>{
      this.mostrar_mensaje = true;
      console.log(data);
      if(data.length == 0){
        this.mostrar_mensaje = true;    
        this.lottieConfig = {
          path: 'https://assets2.lottiefiles.com/datafiles/Qmze6foNYQLQGCK/data.json',
          renderer: 'canvas',
          autoplay: true,
          loop: true
        };
      }else{
        this.hijos = [];
        this.mostrar_mensaje = false;
        data.forEach(hijo =>{
          let tipo_hijo:string;
            if(hijo.genero == 'femenino'){
              tipo_hijo = 'Hija'
            }else if(hijo.genero == 'masculino'){
              tipo_hijo = 'Hijo'
            }
            console.log(tipo_hijo)
            this.hijos.push({
              nombre: hijo.nombre,
              apellido_paterno: hijo.apellido_paterno,
              apellido_materno: hijo.apellido_materno,
              genero: hijo.genero,
              tipo_hijo: tipo_hijo,
              id_hijo: hijo.id_hijo,
              fecha_nacimiento: hijo.Fecha_nacimiento,
              config: {
                  path: `${hijo.json}`,
                  renderer: 'svg',
                  autoplay: true,
                  loop: true
              }
            });
      
        }); 
        this.cantidadHijos.emiteChange({
          cantidad: data.length
        })
      }

    });

  }

  agregarHijo(){
    console.log('abrir agregar hijos');
    console.log('correo: ' + this.correo);
    this.modalCtrl.create(AgregarHijosPage, {usuario: this.correo}).present();
  }

  slideChanged(){
    console.log('slide');
  }

  verHistorial(id_hijo:string){
    this.navCtrl.push(HistorialPage, {correo: this.correo, id_hijo:id_hijo});
  }

  respuesta(id_hijo:string){
    this.modalCtrl.create(ResponderPreguntaPage, {correo: this.correo, id_hijo: id_hijo, pregunta: this.pregunta_random.pregunta}).present();
  }
}
