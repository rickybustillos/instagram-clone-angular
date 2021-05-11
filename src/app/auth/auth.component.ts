import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 250ms ease-in-out',
        ) // duração, delay e aceleração
      ])
    ]),
    trigger('animacao-card', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('1s 250ms ease-in-out',
          keyframes([
            style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),

            style({ offset: 0.40, opacity: 1, transform: 'translateY(15px)' }),
            style({ offset: 0.60, opacity: 1, transform: 'translateY(-15px)' }),
            style({ offset: 0.75, opacity: 1, transform: 'translateX(0)' }),
            style({ offset: 0.85, opacity: 1, transform: 'translateY(-5px)' }),
            style({ offset: 0.95, opacity: 1, transform: 'translateY(5px)' }),

            style({ offset: 1, opacity: 1, transform: 'translateX(0)' }),
          ])
        )
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoCard: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public inicioDaAnimacao(): void {
    // console.log('inicio da animação');
  }

  public fimDaAnimacao(): void {
    // console.log('fim da animação');
  }

}
