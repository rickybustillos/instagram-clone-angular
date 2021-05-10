import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)'
        }),
        animate('500ms 250ms ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('animacao-card', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('500ms 250ms ease-in-out')
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

}
