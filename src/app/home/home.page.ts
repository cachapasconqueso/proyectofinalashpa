import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  userAnswer = '';
  inputError = false;

  usuario = {
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    pais: '',
    estado: '',
    correo: ''
  };

  cards = [
    { id: 1, image: 'assets/cards/1.png', answer: 'saludo' },
    { id: 2, image: 'assets/cards/2.png', answer: 'yo' },
    { id: 3, image: 'assets/cards/3.png', answer: 'tu' },
    { id: 4, image: 'assets/cards/4.png', answer: 'amigo' },
    { id: 5, image: 'assets/cards/5.png', answer: 'pescar' },
    { id: 6, image: 'assets/cards/6.png', answer: 'bebe' },
    { id: 7, image: 'assets/cards/7.png', answer: 'bailar' },
    { id: 8, image: 'assets/cards/8.png', answer: 'tierra' },
    { id: 9, image: 'assets/cards/9.png', answer: 'vaca' },
    { id: 10, image: 'assets/cards/10.png', answer: 'gallina' },
    { id: 11, image: 'assets/cards/11.png', answer: 'chancho' },
    { id: 12, image: 'assets/cards/12.png', answer: 'gato' },
    { id: 13, image: 'assets/cards/13.png', answer: 'perro' },
    { id: 14, image: 'assets/cards/14.png', answer: 'condor' },
    { id: 15, image: 'assets/cards/15.png', answer: 'pez' },
    { id: 16, image: 'assets/cards/16.png', answer: 'cuchara' },
    { id: 17, image: 'assets/cards/17.png', answer: 'fuego' },
    { id: 18, image: 'assets/cards/18.png', answer: 'cuerda' },
    { id: 19, image: 'assets/cards/19.png', answer: 'escalera' },
    { id: 20, image: 'assets/cards/20.png', answer: 'cama' },
    { id: 21, image: 'assets/cards/21.png', answer: 'miel' },
    { id: 22, image: 'assets/cards/22.png', answer: 'pan' },
    { id: 23, image: 'assets/cards/23.png', answer: 'platano' },
    { id: 24, image: 'assets/cards/24.png', answer: 'choclo' },
    { id: 25, image: 'assets/cards/25.png', answer: 'amanecer' },
    { id: 26, image: 'assets/cards/26.png', answer: 'noche' },
    { id: 27, image: 'assets/cards/27.png', answer: 'tarde' },
    { id: 28, image: 'assets/cards/28.png', answer: 'nube' },
    { id: 29, image: 'assets/cards/29.png', answer: 'rayo' },
    { id: 30, image: 'assets/cards/30.png', answer: 'lluvia' },
    { id: 31, image: 'assets/cards/31.png', answer: 'rio' },
    { id: 32, image: 'assets/cards/32.png', answer: 'puente' },
    { id: 33, image: 'assets/cards/33.png', answer: 'piedra' }
  ];

  constructor(private toastController: ToastController) {}

  irARegistro() {
    const element = document.getElementById('seccion-registro');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  irAJuego() {
    const element = document.getElementById('seccion-juego');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async checkAnswer() {
    if (!this.swiperRef) return;
    const swiperEl = this.swiperRef.nativeElement.swiper;
    const activeIndex = swiperEl.activeIndex;

    if (!this.cards[activeIndex]) return;

    const currentCard = this.cards[activeIndex];
    const answer = this.userAnswer.toLowerCase().trim();

    if (answer === currentCard.answer) {
      this.mostrarMensaje('¡Muy bien! Correcto', 'success');
      this.userAnswer = '';
      this.inputError = false;
      
      if (activeIndex < this.cards.length - 1) {
        setTimeout(() => { swiperEl.slideNext(); }, 500);
      } else {
        this.mostrarMensaje('¡Felicidades! Completaste el juego', 'warning');
      }
    } else {
      this.inputError = true;
      this.mostrarMensaje('Intenta de nuevo', 'danger');
      setTimeout(() => { this.inputError = false; }, 500);
    }
  }

  async registrarUsuario() {
    if (!this.usuario.nombres || !this.usuario.correo) {
      this.mostrarMensaje('Por favor completa los campos obligatorios', 'danger');
      return;
    }
    console.log('Datos listos para enviar:', this.usuario);
    this.mostrarMensaje('¡Registro exitoso! Bienvenido/a', 'success');
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      color: color,
      position: 'top',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    toast.present();
  }
}