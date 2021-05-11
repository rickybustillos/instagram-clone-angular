import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Publicacao } from './home/publicacoes/publicacao.model';
import { Progresso } from './progresso.service';



@Injectable()
export class Bd {

  constructor(private progresso: Progresso) { }

  public publish(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((response: any) => {

        let nomeImagem = response.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
              // console.log('Snapshot', snapshot);
            },
            (error: Error) => {
              this.progresso.status = 'erro';
              // console.log(error);
            },
            () => {
              // Finalização do processo
              this.progresso.status = 'concluido'
              // console.log('Upload completo');

            }
          )

      })

  }

  public getPublicacoes(emailUsuario: string): Promise<Publicacao[]> {

    return new Promise((resolve, reject) => {

      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          let publicacoes: Publicacao[] = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val()
            publicacao.key = childSnapshot.key

            publicacoes.push(publicacao)

          });

          return publicacoes.reverse();
          // resolve(publicacoes);

        })
        .then((publicacoes: any) => {

          publicacoes.forEach((publicacao) => {

            // Consultar a URL da imagem
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {

                publicacao.url_imagem = url
                // Consultar o nome do usuário
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                  })
              })
          })
          
          resolve(publicacoes);

        })
    })
  }
}