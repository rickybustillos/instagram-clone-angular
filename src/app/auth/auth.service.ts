import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Auth {

  public error: any;
  public token_id: string;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((response: any) => {
        console.log('Sucesso ao criar a conta.');

        delete usuario.senha;

        // Registrando dados complementares na base 64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set({ usuario })

      })
      .catch((error: Error) => {
        console.log(error);
      })
  }

  public autenticate(email: string, senha: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((response: any) => {

        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigateByUrl('/home');
          })

      })
      .catch((error: Error) => {
        this.error = error;
      })
  }

  public autenticated(): boolean {
    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken');
    }
    if (this.token_id === undefined) {
      this.router.navigateByUrl('/');
    }

    return this.token_id !== undefined;
  }

  public logOut(): void {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.token_id = undefined;
        this.router.navigateByUrl('/');
      })
  }
}