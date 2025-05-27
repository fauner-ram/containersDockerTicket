import { Inject, Injectable, PLATFORM_ID  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventManagerService } from '../events-manager/event-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url = environment.url;
  private token: string = ''; // descomentar esta linea y eliminar linea 16

  constructor(private httpClient: HttpClient, private router: Router, private eventManager: EventManagerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Llama al api para iniciar sesión y solo se debe usar en el LoginComponent
  public login(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/login`, user).pipe(
      map((resp: any) => {
        // this.saveToken(resp.token, resp.expir);
        // this.saveUserLogged(resp.usuario);
        this.saveToken(resp.data.token, resp.data.expiresIn);
        this.saveUserLogged(resp.data.user[0]);
        return resp;
      })
    );
  }

  // Guarda el token en el storage
  private saveToken(token: string, expiration: any) {
    if (typeof window !== 'undefined' && token != null) {
      this.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('expire', expiration);
    } else {
      this.token = '';
    }
  }


  // Guarda en storage los datos del usuario logueado
  private saveUserLogged(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLogged');
      const userLogged: any = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      };
      localStorage.setItem('userLogged', JSON.stringify(user));

      this.eventManager.userLogged.set(user);
    }
  }

  // Método para obtener el rol del usuario
  public getUserRole(): number {
    const user = JSON.parse(localStorage.getItem('userLogged') || '{}');
    return user?.roles?.idRoles || null;
  }

  // obtiene en token del local storage para validarlo
  public getStorageToken() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      const isToken: any = localStorage.getItem('token')!;
      this.token = isToken;
      return this.token;
    }
    return (this.token = '');
  }


  // Esta funcion valida fecha de expiracion del token, para dar acceso al sistema
  public isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    this.getStorageToken();

    if (localStorage.getItem('token') && localStorage.getItem('expire')) {
      let res: boolean = true;
      const expirationDate = localStorage.getItem('expire')!;
      const today = new Date();
      const expiration = new Date(expirationDate.toString());
      if (today > expiration) {
        res = false;
        return res;
      }
      return res;
    } else {
      return false;
    }
  }


  // Llamar esta funcion en cualquier lado, para limpiar cache y cerrar sesión
  public logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expire');
      localStorage.removeItem('userLogged');
      localStorage.clear();
    }
    this.router.navigateByUrl('login');
  }

}
