import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Progresso } from 'src/app/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public updateTimeline: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publish(): void {
    this.bd.publish({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let continua = new Subject();
    continua.next(true);

    let acompanhamentoUpload = interval(1000).pipe(takeUntil(continua));
    
    acompanhamentoUpload
      .subscribe(() => {
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100);

        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          // Emitir um evento do componente parent (home component)
          this.updateTimeline.emit();

          continua.next(false);
        }
      })
  }

  public prepareImageUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
