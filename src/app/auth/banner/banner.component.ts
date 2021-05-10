import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Imagem } from './imagem.model';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('invisivel', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('invisivel <=> visivel', animate('1s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel'

  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-auth/img_1.png' },
    { estado: 'invisivel', url: '/assets/banner-auth/img_2.png' },
    { estado: 'invisivel', url: '/assets/banner-auth/img_3.png' },
    { estado: 'invisivel', url: '/assets/banner-auth/img_4.png' },
    { estado: 'invisivel', url: '/assets/banner-auth/img_5.png' },
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.logicaRotacao()
    }, 3000);
  }

  public logicaRotacao(): void {

    // Auxilia na exibição da imagem seguinte
    let idx: number;

    // Ocultando imagem
    for (let i: number = 0; i <= this.imagens.length - 1; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'invisivel'

        idx = i === 4 ? 0 : i + 1

        break
      }
    }

    // Exibir próxima imagem
    this.imagens[idx].estado = 'visivel'

    // Loop com delay de 3s
    setTimeout(() => {
      this.logicaRotacao()
    }, 3000);
  }

}
