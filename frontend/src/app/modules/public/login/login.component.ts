import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../../ng-zorro.module';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgZorroModule, CommonModule,NzPopoverModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loader: boolean = false;
  isSubmitData: boolean = false;
  passwordVisible: boolean = false;
  captchaValidation: boolean = false;
  showError: boolean = false;
  showButton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: LoginService,
    private notificationService: NzNotificationService,
  ) {
    this.createForm();
  }
  ngOnInit(): void {

  }
  createForm() {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitRequest() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.isSubmitData = true; // Activa el loading

    const { email, password } = this.loginForm.value;
    const payload: any = {
      email,
      password: password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {

        this.isSubmitData = false;
        //  localStorage.setItem('token', res.data.token);
        //  localStorage.setItem('user',  JSON.stringify(res.data.user[0]));
        this.router.navigateByUrl('dash');

        //  descomentar si se necesita el rol del usuario para redireccionar a una u otra 
        //  const userRole = this.authService.getUserRole();
        //  setTimeout(() => {
        //    if (userRole === 1) {
        //       // this.router.navigateByUrl('home');
        //       this.router.navigate(['/homeA']);
        //    } else {
        //       this.router.navigate(['/dash']);
        //    }
        //    // this.router.navigate(['/homeA']);
        //    // this.router.navigate(['/dash']);
        //    }, 100); // Pequeña espera para asegurar que se guardó el token
      },
      error: (error: any) => {
        this.isSubmitData = false;

        if (error.status == 401) {
          this.createNotificacion('error', 'Error', error.error.message);
          return;
        }

        this.createNotificacion('error', 'Error', 'Lo sentimos, hubo un error en el servidor.');
      },
      complete: () => { }
    });
  }

  /**
   * Crea una notificacion de alerta
   * @param type - string recibe el tipo de notificacion (error, success, warning, info)
   * @param title - string recibe el titulo de la notificacion
   * @param message - string recibe el mensaje de la notificacion
   */
  createNotificacion(type: string, title: string, message: string) {
    this.notificationService.create(type, title, message);
  }

  resolved(captchaResponse: any) {
    this.captchaValidation = true;
    this.showError = false;
  }

  errored() {
    this.captchaValidation = false;
    this.showError = true;
    console.warn(`reCAPTCHA error encountered`);
  }

}
