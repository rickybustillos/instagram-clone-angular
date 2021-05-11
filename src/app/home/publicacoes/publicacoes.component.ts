import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Bd } from 'src/app/bd.service';
import { Publicacao } from './publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {

  public publicacoes: Publicacao[];
  public email: string;

  constructor(private bd: Bd) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.updateTimeline();
    })
  }

  public updateTimeline(): void {
    this.bd.getPublicacoes(this.email)
      .then((publicacoes: Publicacao[]) => {
        this.publicacoes = publicacoes;
      })
  }

}
